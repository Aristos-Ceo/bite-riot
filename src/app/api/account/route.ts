import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCustomerFromRequest } from "@/lib/customer-session";
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { SignJWT } from "jose";
import { z } from "zod";

export const runtime = "nodejs";
const scrypt = promisify(scryptCallback);
const schema = z.object({
  action: z.enum(["register", "login"]),
  name: z.string().trim().min(2).max(100).optional(),
  email: z.email().transform((value) => value.toLowerCase().trim()),
  phone: z.string().trim().max(30).optional(),
  password: z.string().min(8).max(128),
}).refine((value) => value.action !== "register" || /[A-Z]/.test(value.password), {
  message: "For a new account, your password must include at least one uppercase letter.",
  path: ["password"],
});
const profileSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().max(30).optional().default(""),
  address: z.string().trim().max(500).optional().default(""),
});
const sessionSecret = () => {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("Set SESSION_SECRET to a random value of at least 32 characters in .env.");
  return new TextEncoder().encode(value);
};
async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, 64) as Buffer;
  return `scrypt:${salt}:${derived.toString("hex")}`;
}
async function verifyPassword(password: string, stored: string) {
  const [scheme, salt, hash] = stored.split(":");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = await scrypt(password, salt, expected.length) as Buffer;
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
async function createSession(customer: { id: string; name: string; email: string }) {
  return new SignJWT({ email: customer.email, name: customer.name })
    .setProtectedHeader({ alg: "HS256" }).setSubject(customer.id)
    .setIssuedAt().setExpirationTime("7d").sign(sessionSecret());
}
async function notifyOwner(customer: { name: string; email: string; phone: string | null }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.BITE_RIOT_FROM_EMAIL;
  const to = process.env.BITE_RIOT_OWNER_EMAIL || "itzavery57@gmail.com";
  if (!key || !from) return false;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject: "New BITE RIOT customer account", text: `A customer account was created.\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone || "Not supplied"}\n\nPasswords are never included in email notifications.` }),
    });
    return response.ok;
  } catch (error) { console.error("BITE RIOT account notification failed:", error); return false; }
}
function withSession(data: unknown, token: string, status = 200) {
  const response = NextResponse.json(data, { status });
  response.cookies.set("bite-riot-session", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return response;
}

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    if (body.action === "register") {
      if (!body.name) return NextResponse.json({ error: "Enter your name to create an account." }, { status: 400 });
      const customer = await prisma.customer.create({
        data: { name: body.name, email: body.email, phone: body.phone || null, passwordHash: await hashPassword(body.password) },
        select: { id: true, name: true, email: true, phone: true, address: true },
      });
      const emailSent = await notifyOwner(customer);
      const token = await createSession(customer);
      return withSession({ customer, message: emailSent ? "Your account is ready. Welcome to the RIOT." : "Your account is ready. Welcome to the RIOT." }, token, 201);
    }
    const customer = await prisma.customer.findUnique({ where: { email: body.email } });
    if (!customer || !(await verifyPassword(body.password, customer.passwordHash))) {
      return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
    }
    const safeCustomer = { id: customer.id, name: customer.name, email: customer.email, phone: customer.phone, address: customer.address };
    return withSession({ customer: safeCustomer, message: "You're signed in. Welcome back." }, await createSession(safeCustomer));
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues[0]?.message || "Check your details. Passwords must be at least 8 characters." }, { status: 400 });
    if ((error as { code?: string })?.code === "P2002") return NextResponse.json({ error: "An account already exists with that email. Sign in instead." }, { status: 409 });
    console.error("BITE RIOT account error:", error);
    return NextResponse.json({ error: "We couldn't complete that account request. Check the database setup and try again." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const customer = await getCustomerFromRequest(request);
  if (!customer) return NextResponse.json({ customer: null }, { headers: { "Cache-Control": "no-store" } });
  const orders = await prisma.order.findMany({
    where: { email: customer.email }, orderBy: { createdAt: "desc" }, take: 20,
    select: { reference: true, status: true, paymentStatus: true, total: true, createdAt: true, items: { select: { name: true, quantity: true, unitPrice: true } } },
  });
  return NextResponse.json({ customer, orders }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  const customer = await getCustomerFromRequest(request);
  if (!customer) return NextResponse.json({ error: "Please sign in to update your profile." }, { status: 401 });
  try {
    const body = profileSchema.parse(await request.json());
    const updated = await prisma.customer.update({ where: { id: customer.id }, data: { name: body.name, phone: body.phone || null, address: body.address || null }, select: { id: true, name: true, email: true, phone: true, address: true } });
    return NextResponse.json({ customer: updated, message: "Your profile has been updated." });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Please check your profile details." }, { status: 400 });
    console.error("BITE RIOT profile update failed:", error);
    return NextResponse.json({ error: "We couldn't save your profile. Please try again." }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ message: "You have been signed out." });
  response.cookies.set("bite-riot-session", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
