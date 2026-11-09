import { NextResponse } from "next/server";
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
const scrypt = promisify(scryptCallback);
const emailSchema = z.object({ email: z.email().transform((value) => value.toLowerCase().trim()) });
const resetSchema = z.object({ token: z.string().min(32).max(200), password: z.string().min(8).max(128).regex(/[A-Z]/, "Your new password must include at least one uppercase letter.") });
const digest = (value: string) => createHash("sha256").update(value).digest("hex");

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, 64) as Buffer;
  return `scrypt:${salt}:${derived.toString("hex")}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Please check the information and try again." }, { status: 400 }); }

  const action = (body as { action?: string } | null)?.action;
  if (action === "request") {
    const parsed = emailSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    const generic = "If an account exists for that email, a password-reset link will be sent shortly.";
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.BITE_RIOT_FROM_EMAIL;
    if (!apiKey || !from) {
      return NextResponse.json({ error: "Password reset email is not configured yet. Please contact the store or ask the site administrator to finish email setup." }, { status: 503 });
    }
    const customer = await prisma.customer.findUnique({ where: { email: parsed.data.email }, select: { id: true, email: true, name: true } });
    if (!customer) return NextResponse.json({ message: generic });
    const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

    const rawToken = randomBytes(32).toString("hex");
    const tokenHash = digest(rawToken);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await prisma.$transaction([
      prisma.passwordResetToken.deleteMany({ where: { customerId: customer.id } }),
      prisma.passwordResetToken.create({ data: { customerId: customer.id, tokenHash, expiresAt } }),
    ]);
    const resetUrl = `${siteUrl.replace(/\/$/, "")}/reset-password?token=${rawToken}`;
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [customer.email],
        subject: "Reset your BITE RIOT password",
        html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#173c2d"><p style="letter-spacing:3px;font-weight:bold">BITE RIOT</p><h1>BACK IN THE RIOT?</h1><p>Hi ${customer.name.replace(/[&<>"']/g, "")},</p><p>Use the button below to choose a new password. This link expires in 30 minutes and can only be used once.</p><p><a href="${resetUrl}" style="display:inline-block;background:#173c2d;color:#fff;padding:14px 22px;text-decoration:none;border-radius:6px">RESET MY PASSWORD</a></p><p>If you didn't request this, you can ignore this email. Your password won't change.</p></div>`,
      }),
    });
    if (!sent.ok) {
      await prisma.passwordResetToken.deleteMany({ where: { tokenHash } });
      console.error("BITE RIOT password reset email failed:", await sent.text());
    }
    return NextResponse.json({ message: generic });
  }

  if (action === "reset") {
    const parsed = resetSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Choose a valid new password." }, { status: 400 });
    const tokenHash = digest(parsed.data.token);
    const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
    if (!record || record.expiresAt.getTime() <= Date.now()) {
      if (record) await prisma.passwordResetToken.delete({ where: { id: record.id } });
      return NextResponse.json({ error: "This reset link has expired or has already been used. Request a new one." }, { status: 400 });
    }
    const passwordHash = await hashPassword(parsed.data.password);
    await prisma.$transaction([
      prisma.customer.update({ where: { id: record.customerId }, data: { passwordHash } }),
      prisma.passwordResetToken.deleteMany({ where: { customerId: record.customerId } }),
    ]);
    return NextResponse.json({ message: "Your password has been changed. You can now sign in with your new password." });
  }
  return NextResponse.json({ error: "Invalid password-reset request." }, { status: 400 });
}
