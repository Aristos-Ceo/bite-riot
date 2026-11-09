import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export async function getCustomerFromRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const token = cookieHeader.split(";").map((part) => part.trim())
    .find((part) => part.startsWith("bite-riot-session="))
    ?.slice("bite-riot-session=".length);
  if (!token) return null;
  try {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 32) return null;
    const { payload } = await jwtVerify(decodeURIComponent(token), new TextEncoder().encode(secret));
    if (!payload.sub) return null;
    return await prisma.customer.findUnique({
      where: { id: payload.sub },
      select: { id: true, name: true, email: true, phone: true, address: true },
    });
  } catch {
    return null;
  }
}
