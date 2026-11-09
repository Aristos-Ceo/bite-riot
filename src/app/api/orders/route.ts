import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCustomerFromRequest } from "@/lib/customer-session";

const schema = z.object({
  customerName: z.string().trim().min(2).max(100),
  email: z.email(),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().min(5).max(500),
  notes: z.string().max(1000).optional(),
  items: z.array(z.object({ productId: z.string().min(1), quantity: z.number().int().min(1).max(20) })).min(1).max(30),
});
const formatNaira = (amount: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);

export async function POST(req: Request) {
  try {
    const customer = await getCustomerFromRequest(req);
    if (!customer) return NextResponse.json({ error: "Please sign in or create an account before placing an order." }, { status: 401 });
    const body = schema.parse(await req.json());
    if (body.email.toLowerCase().trim() !== customer.email) return NextResponse.json({ error: "The order email must match your signed-in account." }, { status: 403 });
    const ids = [...new Set(body.items.map((item) => item.productId))];
    const products = await prisma.product.findMany({ where: { available: true, OR: [{ id: { in: ids } }, { slug: { in: ids } }] } });
    const byId = new Map<string, (typeof products)[number]>();
    for (const product of products) { byId.set(product.id, product); byId.set(product.slug, product); }
    if (ids.some((id) => !byId.has(id))) return NextResponse.json({ error: "One or more products are unavailable. Please refresh your bag." }, { status: 400 });
    const lines = body.items.map((item) => ({ product: byId.get(item.productId)!, quantity: item.quantity }));
    const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
    const reference = `BR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const order = await prisma.order.create({ data: {
      reference, customerName: customer.name, email: customer.email,
      phone: body.phone, address: body.address, notes: body.notes?.trim() || null,
      subtotal, total: subtotal, status: "PENDING", paymentStatus: "UNPAID",
      items: { create: lines.map((line) => ({ productId: line.product.id, name: line.product.name, unitPrice: line.product.price, quantity: line.quantity })) },
    } });
    const message = [
      "Hello BITE RIOT! I'd like to confirm this order.", "", `Order reference: ${order.reference}`,
      `Name: ${customer.name}`, `Phone: ${body.phone}`, `Email: ${customer.email}`, `Delivery address: ${body.address}`,
      "", "ORDER ITEMS", ...lines.map((line) => `• ${line.quantity} × ${line.product.name} — ${formatNaira(line.product.price * line.quantity)}`),
      "", `Food subtotal: ${formatNaira(subtotal)}`, "Delivery fee: Please confirm with me.",
      "", body.notes?.trim() ? `Order notes: ${body.notes.trim()}` : "Order notes: None",
      "", "Please confirm item availability, delivery fee and final total before preparing my order.",
    ].join("\n");
    const whatsappNumber = (process.env.BITE_RIOT_WHATSAPP_NUMBER || "2349137902342").replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    return NextResponse.json({ id: order.id, reference: order.reference, total: order.total, whatsappUrl }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Please check your name, email, phone number and order details." }, { status: 400 });
    console.error("BITE RIOT order creation failed:", error);
    return NextResponse.json({ error: "Unable to save your order right now. Please try again." }, { status: 500 });
  }
}

// Order tracking is private: customers can only retrieve orders belonging to their signed-in account.
export async function GET(req: Request) {
  const customer = await getCustomerFromRequest(req);
  if (!customer) return NextResponse.json({ error: "Sign in to view and track your orders." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  const url = new URL(req.url);
  const reference = url.searchParams.get("reference")?.trim();
  const where = reference ? { reference, email: customer.email } : { email: customer.email };
  const orders = await prisma.order.findMany({
    where,
    include: { items: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  if (reference && !orders.length) return NextResponse.json({ error: "We couldn't find that order in your account." }, { status: 404, headers: { "Cache-Control": "no-store" } });
  const productIds = [...new Set(orders.flatMap((order) => order.items.map((item) => item.productId)))];
  const products = productIds.length ? await prisma.product.findMany({ where: { id: { in: productIds } }, select: { id: true, image: true } }) : [];
  const imageById = new Map(products.map((product) => [product.id, product.image]));
  const result = orders.map((order) => ({
    reference: order.reference, customerName: order.customerName, status: order.status,
    createdAt: order.createdAt, total: order.total, address: order.address,
    items: order.items.map((item) => ({ name: item.name, quantity: item.quantity, unitPrice: item.unitPrice, image: imageById.get(item.productId) || null })),
  }));
  return NextResponse.json({ orders: result }, { headers: { "Cache-Control": "no-store" } });
}
