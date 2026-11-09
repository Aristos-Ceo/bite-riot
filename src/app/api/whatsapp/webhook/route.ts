import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function normalisePhone(value: string) {
  return value.replace(/\D/g, "");
}

// Meta calls this endpoint when you verify the webhook in the WhatsApp dashboard.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const expected = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
  if (mode === "subscribe" && expected && token === expected && challenge) {
    return new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain" } });
  }
  return NextResponse.json({ error: "Webhook verification failed." }, { status: 403 });
}

async function sendCustomerUpdate(to: string, reference: string, status: "PREPARING" | "COMPLETED") {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) {
    console.error("WhatsApp customer notification skipped: missing WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID.");
    return;
  }
  const message = status === "PREPARING"
    ? `BITE RIOT update for ${reference}: we're preparing your food now. Track your order on our website.`
    : `BITE RIOT update for ${reference}: your order is completed. Thank you for choosing BITE RIOT!`;
  const version = process.env.WHATSAPP_GRAPH_API_VERSION || "v22.0";
  const response = await fetch(`https://graph.facebook.com/${version}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", to: normalisePhone(to), type: "text", text: { preview_url: false, body: message } }),
  });
  if (!response.ok) {
    const detail = await response.text();
    console.error("WhatsApp customer notification failed:", response.status, detail);
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  const signature = request.headers.get("x-hub-signature-256") || "";
  if (!appSecret || !signature.startsWith("sha256=")) {
    return NextResponse.json({ error: "Webhook signature is not configured." }, { status: 401 });
  }
  const expectedSignature = `sha256=${createHmac("sha256", appSecret).update(rawBody).digest("hex")}`;
  if (!safeEqual(signature, expectedSignature)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  let payload: any;
  try { payload = JSON.parse(rawBody); }
  catch { return NextResponse.json({ received: true }); }

  const authorisedNumber = normalisePhone(process.env.BITE_RIOT_ADMIN_WHATSAPP_NUMBER || "");
  if (!authorisedNumber) {
    console.error("Set BITE_RIOT_ADMIN_WHATSAPP_NUMBER before enabling WhatsApp order commands.");
    return NextResponse.json({ received: true });
  }

  const messages = (payload.entry || []).flatMap((entry: any) => entry.changes || [])
    .flatMap((change: any) => change.value?.messages || []);

  for (const message of messages) {
    const sender = normalisePhone(String(message.from || ""));
    const body = String(message.text?.body || "").trim();
    if (sender !== authorisedNumber) continue;
    const match = body.match(/^(PREPARE|COMPLETE)\s+(BR-[A-Z0-9-]{4,70})$/i);
    if (!match) continue;

    const command = match[1].toUpperCase();
    const reference = match[2].toUpperCase();
    const nextStatus = command === "PREPARE" ? "PREPARING" as const : "COMPLETED" as const;
    const order = await prisma.order.findUnique({ where: { reference }, select: { id: true, status: true, phone: true } });
    if (!order) continue;

    const allowed = command === "PREPARE"
      ? order.status === "PENDING"
      : order.status === "PREPARING";
    if (!allowed) continue;

    await prisma.order.update({ where: { id: order.id }, data: { status: nextStatus } });
    await sendCustomerUpdate(order.phone, reference, nextStatus);
  }

  return NextResponse.json({ received: true });
}
