import { NextResponse } from "next/server";
import { createRemoteJWKSet, jwtVerify, SignJWT } from "jose";
import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
const scrypt = promisify(scryptCallback);
const googleKeys = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));
async function randomPasswordHash() {
  const salt = randomBytes(16).toString("hex");
  const password = randomBytes(48).toString("hex");
  const derived = await scrypt(password, salt, 64) as Buffer;
  return `scrypt:${salt}:${derived.toString("hex")}`;
}
export async function GET(request: Request) {
  const url = new URL(request.url);
  const fail = (reason: string) => NextResponse.redirect(new URL(`/account?google=${reason}`, url.origin));
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = request.headers.get("cookie") || "";
  const readCookie = (name: string) => cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1);
  const expectedState = readCookie("bite-riot-google-state");
  const expectedNonce = readCookie("bite-riot-google-nonce");
  if (!code || !state || !expectedState || state !== expectedState || !expectedNonce) return fail("failed");
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const sessionSecret = process.env.SESSION_SECRET;
  if (!clientId || !clientSecret || !sessionSecret || sessionSecret.length < 32) return fail("not-configured");
  try {
    const redirectUri = `${url.origin}/api/auth/google/callback`;
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: "authorization_code" }),
    });
    const tokenData = await tokenResponse.json() as { id_token?: string };
    if (!tokenResponse.ok || !tokenData.id_token) return fail("failed");
    const { payload } = await jwtVerify(tokenData.id_token, googleKeys, { issuer: ["https://accounts.google.com", "accounts.google.com"], audience: clientId });
    if (payload.nonce !== expectedNonce || payload.email_verified !== true || typeof payload.email !== "string" || typeof payload.sub !== "string") return fail("failed");
    const email = payload.email.toLowerCase();
    const name = typeof payload.name === "string" && payload.name.trim() ? payload.name.trim() : email.split("@")[0];
    let customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) customer = await prisma.customer.create({ data: { name, email, passwordHash: await randomPasswordHash() } });
    const session = await new SignJWT({ email: customer.email, name: customer.name }).setProtectedHeader({ alg: "HS256" }).setSubject(customer.id).setIssuedAt().setExpirationTime("7d").sign(new TextEncoder().encode(sessionSecret));
    const response = NextResponse.redirect(new URL("/account?google=success", url.origin));
    const opts = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/" };
    response.cookies.set("bite-riot-session", session, { ...opts, maxAge: 60 * 60 * 24 * 7 });
    response.cookies.set("bite-riot-google-state", "", { ...opts, maxAge: 0 });
    response.cookies.set("bite-riot-google-nonce", "", { ...opts, maxAge: 0 });
    return response;
  } catch (error) {
    console.error("BITE RIOT Google sign-in failed:", error);
    return fail("failed");
  }
}
