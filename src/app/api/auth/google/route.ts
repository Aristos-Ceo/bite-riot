import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

export const runtime = "nodejs";
export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) return NextResponse.redirect(new URL("/account?google=not-configured", request.url));
  const url = new URL(request.url);
  const redirectUri = `${url.origin}/api/auth/google/callback`;
  const state = randomBytes(24).toString("hex");
  const nonce = randomBytes(24).toString("hex");
  const google = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  google.search = new URLSearchParams({ client_id: clientId, redirect_uri: redirectUri, response_type: "code", scope: "openid email profile", state, nonce, prompt: "select_account" }).toString();
  const response = NextResponse.redirect(google);
  const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 600 };
  response.cookies.set("bite-riot-google-state", state, cookieOptions);
  response.cookies.set("bite-riot-google-nonce", nonce, cookieOptions);
  return response;
}
