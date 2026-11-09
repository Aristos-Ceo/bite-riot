"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, Clock3, MapPin, Package, RefreshCw, ShoppingBag } from "lucide-react";

type TrackItem = { name: string; quantity: number; unitPrice: number; image: string | null };
type TrackOrder = { reference: string; customerName: string; status: string; createdAt: string; total: number; address: string; items: TrackItem[] };
const steps = ["PENDING", "PREPARING", "COMPLETED"];
const labels: Record<string, string> = { PENDING: "Order received", PREPARING: "Preparing your food", COMPLETED: "Completed", CANCELLED: "Cancelled" };
const money = (amount: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);
function remaining(createdAt: string, now: number) {
  // A clearly labelled 30-minute preparation estimate, not a live courier ETA.
  const ms = new Date(createdAt).getTime() + 30 * 60 * 1000 - now;
  if (ms <= 0) return "00:00";
  const seconds = Math.floor(ms / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function TrackOrder() {
  const [orders, setOrders] = useState<TrackOrder[]>([]);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);
  const [now, setNow] = useState(Date.now());
  const load = useCallback(async () => {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/orders", { cache: "no-store" });
      const data = await response.json();
      if (response.status === 401) { window.location.href = "/account?next=%2Ftrack"; return; }
      if (!response.ok) throw new Error(data.error || "We couldn't load your orders.");
      const list = Array.isArray(data.orders) ? data.orders as TrackOrder[] : [];
      setOrders(list);
      setSelected((current) => list.some((order) => order.reference === current) ? current : list[0]?.reference || "");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "We couldn't load your orders."); }
    finally { setBusy(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const refresh = window.setInterval(async () => {
      try {
        const response = await fetch("/api/orders", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data.orders)) setOrders(data.orders as TrackOrder[]);
      } catch { /* Keep the last successfully loaded order state on temporary network errors. */ }
    }, 30000);
    return () => window.clearInterval(refresh);
  }, []);
  const order = useMemo(() => orders.find((item) => item.reference === selected) || orders[0], [orders, selected]);
  const activeIndex = order ? steps.indexOf(order.status) : -1;
  const isCancelled = order?.status === "CANCELLED";
  const isReadyOrLater = order && order.status === "COMPLETED";

  return <main>
    <section className="page-hero"><div className="wrap"><div className="eyebrow" style={{ color: "var(--lime)" }}>YOUR ORDER / YOUR RIOT</div><h1 className="display">THE FOOD<br/><span className="editorial" style={{ color: "var(--lime)" }}>tracker.</span></h1><p>Your orders, their progress and the good stuff inside — all in your account.</p></div></section>
    <section className="section"><div className="wrap" style={{ maxWidth: 1000 }}>
      {busy ? <div className="track-result"><p>Loading your orders…</p></div> : error ? <div className="track-result"><p role="alert">{error}</p><button className="btn" onClick={() => void load()}><RefreshCw size={15}/> Try again</button><p><Link href="/account">Back to my profile</Link></p></div> : !orders.length ? <div className="track-result"><div className="eyebrow">NOTHING TRACKING YET</div><h2 className="display">YOUR NEXT<br/><em>GOOD THING.</em></h2><p>Your orders will appear here after you place one while signed in.</p><Link className="btn" href="/menu">Explore the menu <ArrowRight size={15}/></Link></div> : <>
        {orders.length > 1 && <div className="track-form" style={{ marginBottom: 22 }}><label htmlFor="track-order-select">Choose an order</label><select id="track-order-select" value={order?.reference || ""} onChange={(event) => setSelected(event.target.value)}>{orders.map((item) => <option key={item.reference} value={item.reference}>{item.reference} — {labels[item.status] || item.status}</option>)}</select></div>}
        {order && <article className="track-result" style={{ overflow: "hidden" }}>
          <div className="eyebrow">ORDER {order.reference}</div><h2 className="display">{labels[order.status] || order.status.replaceAll("_", " ")}</h2>
          <p>Placed {new Date(order.createdAt).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 14, margin: "24px 0" }}>
            <div style={{ borderRadius: 18, padding: 20, background: "var(--forest)", color: "var(--ivory)" }}><div className="eyebrow" style={{ color: "var(--lime)" }}><Clock3 size={14}/> PREPARATION ESTIMATE</div><div style={{ font: "800 clamp(38px,7vw,58px)/1 Syne,sans-serif", color: "var(--lime)", margin: "12px 0 7px", fontVariantNumeric: "tabular-nums" }}>{isReadyOrLater || isCancelled ? "—" : remaining(order.createdAt, now)}</div><small style={{ color: "#d8e3d9", lineHeight: 1.6 }}>{isReadyOrLater ? "Your order has moved beyond preparation." : isCancelled ? "This order was cancelled." : "Indicative 30-minute preparation window from order placement. The restaurant's status update is the source of truth."}</small></div>
            <div style={{ borderRadius: 18, padding: 20, background: "#f0eee5" }}><div className="eyebrow"><Package size={14}/> ORDER TOTAL</div><div style={{ font: "800 clamp(30px,5vw,42px)/1 Syne,sans-serif", color: "var(--botanical)", margin: "15px 0" }}>{money(order.total)}</div><small style={{ color: "#687267" }}>Payment is handled directly with BITE RIOT for this project version.</small></div>
          </div>
          {!isCancelled && <div className="track-steps">{steps.map((step, index) => <div className={`track-step ${activeIndex >= index ? "done" : ""}`} key={step}><span>{activeIndex >= index ? "✓" : index + 1}</span><b>{labels[step]}</b></div>)}</div>}
          <div style={{ marginTop: 28, paddingTop: 22, borderTop: "1px solid var(--line)" }}><div className="eyebrow">WHAT'S IN THE BAG</div>{order.items.map((item, index) => <div key={`${item.name}-${index}`} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: "1px solid var(--line)" }}>{item.image ? <img src={item.image} alt={item.name} style={{ width: 66, height: 66, objectFit: "cover", borderRadius: 13 }} /> : <div style={{ width: 66, height: 66, borderRadius: 13, background: "#eee8da", display: "grid", placeItems: "center" }}><ShoppingBag/></div>}<div style={{ flex: 1 }}><b>{item.name}</b><div style={{ color: "#687267", fontSize: 12 }}>Quantity: {item.quantity}</div></div><strong>{money(item.unitPrice * item.quantity)}</strong></div>)}</div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 20, color: "#687267", fontSize: 12 }}><MapPin size={17}/><span>{order.address}</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 25 }}><button className="btn" onClick={() => void load()}><RefreshCw size={15}/> Refresh order status</button><Link className="btn" href="/account">My profile <ArrowRight size={15}/></Link></div>
        </article>}
      </>}
    </div></section>
  </main>;
}
