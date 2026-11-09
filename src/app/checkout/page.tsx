"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { money } from "@/lib/money";
import { sectionImages } from "@/lib/bite-riot-images";

export default function Checkout() {
  const { items, subtotal, clear, hydrated } = useCart();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [customer, setCustomer] = useState<{name:string;email:string;phone:string|null;address:string|null}|null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  useEffect(() => { fetch("/api/account", { cache: "no-store" }).then((r)=>r.json()).then((data)=>setCustomer(data.customer || null)).catch(()=>setCustomer(null)).finally(()=>setAuthLoaded(true)); }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length || busy || !customer) return;
    setBusy(true);
    setMsg("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          address: form.get("address"),
          notes: form.get("notes"),
          items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We couldn't create the order. Please try again.");
      setWhatsappUrl(typeof data.whatsappUrl === "string" ? data.whatsappUrl : "");
      clear();
      window.dispatchEvent(new CustomEvent("bite-riot-toast", { detail: { message: `Order saved · ${data.reference}` } }));
      setSuccess(true);
      setMsg(`Your order ${data.reference} has been saved as pending. Send the prepared order summary to BITE RIOT on WhatsApp so the team can confirm availability and delivery.`);
    } catch (error) {
      setMsg(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="br-checkout-page">
      <section className="br-checkout-hero">
        <div className="br-checkout-hero-photo">
          <img src={sectionImages.storySharing} alt="Friends sharing a meal around the table" />
        </div>
        <div className="wrap br-checkout-hero-content">
          <div className="eyebrow">THE FINAL STEP / MADE WITH GOOD TASTE</div>
          <h1 className="display">LET’S GET<br /><em>YOU FED.</em></h1>
          <p>A few details, one very good order. Check your bag, tell us where it’s going and we’ll take it from there.</p>
          <span>GOOD FOOD. ZERO QUIET. ✳</span>
        </div>
      </section>

      <section className="section br-checkout-section">
        <div className="wrap br-checkout-layout">
          <div className="br-checkout-form-wrap">
            <Link className="br-checkout-back" href="/cart"><ArrowLeft size={15} /> Back to your bag</Link>
            {success ? (
              <div className="br-checkout-success">
                <CheckCircle2 size={38} />
                <div className="eyebrow">ORDER RECEIVED</div>
                <h2 className="display">THAT’S A<br /><em>GOOD ONE.</em></h2>
                <p>{msg}</p>
                {whatsappUrl && (
                  <a className="btn" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Send order on WhatsApp <ArrowRight size={16} />
                  </a>
                )}
                <Link className="br-checkout-back" href="/track">Track your order <ArrowRight size={16} /></Link>
              </div>
            ) : !authLoaded ? (
              <div className="br-checkout-empty">Checking your customer account…</div>
            ) : !customer ? (
              <div className="br-checkout-empty"><div className="eyebrow">THE RIOT CLUB / CUSTOMER CHECKOUT</div><h2 className="display">YOUR ORDER.<br/><em>YOUR ACCOUNT.</em></h2><p>Please create an account or sign in before placing an order. Your details and order history will be saved to your profile.</p><Link className="btn" href="/account">Sign in or create account <ArrowRight size={16}/></Link></div>
            ) : !hydrated ? (
              <div className="br-checkout-empty">Getting your order ready…</div>
            ) : !items.length ? (
              <div className="br-checkout-empty">
                <div className="eyebrow">YOUR BAG IS EMPTY</div>
                <h2 className="display">LET’S FIND<br /><em>YOUR CRAVING.</em></h2>
                <p>Add a few favourites before heading to checkout.</p>
                <Link className="btn" href="/menu">Explore the menu <ArrowRight size={16} /></Link>
              </div>
            ) : (
              <>
                <div className="eyebrow">01 / WHERE SHOULD WE SEND IT?</div>
                <h2 className="display br-checkout-form-title">YOUR<br /><em>DETAILS.</em></h2>
                <p className="br-checkout-intro">Please use details we can reach if the team needs to confirm anything about your order.</p>
                <form className="br-checkout-form" onSubmit={submit}>
                  <label>Full name<input name="name" autoComplete="name" defaultValue={customer.name} placeholder="Your name" required /></label>
                  <div className="br-checkout-form-row">
                    <label>Email address<input name="email" type="email" autoComplete="email" defaultValue={customer.email} readOnly required /></label>
                    <label>Phone number<input name="phone" type="tel" autoComplete="tel" defaultValue={customer.phone || ""} placeholder="Your phone number" required /></label>
                  </div>
                  <label>Delivery address<textarea name="address" autoComplete="street-address" defaultValue={customer.address || ""} placeholder="Street, area and any helpful directions" required /></label>
                  <label>Order notes <span className="br-optional">(OPTIONAL)</span><textarea name="notes" placeholder="Anything the team should know?" /></label>
                  <div className="br-checkout-payment-note"><LockKeyhole size={17} /><div><b>Payment information</b><span>Online payment is not enabled yet. Your order request is submitted to the restaurant for confirmation; no card details are collected here.</span></div></div>
                  <button className="btn br-checkout-submit" disabled={busy || !items.length}>
                    {busy ? "Submitting your order…" : "Submit order request"} <ArrowRight size={16} />
                  </button>
                  {msg && !success && <div className="notice" role="alert">{msg}</div>}
                </form>
              </>
            )}
          </div>

          <aside className="br-checkout-summary">
            <div className="eyebrow">02 / YOUR ORDER</div>
            <h2 className="display">THE<br /><em>LINE-UP.</em></h2>
            {items.map((item) => (
              <div className="br-checkout-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div><b>{item.name}</b><span>Qty {item.quantity}</span></div>
                <strong>{money(item.price * item.quantity)}</strong>
              </div>
            ))}
            <div className="br-checkout-total"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
            <p className="br-checkout-summary-note">Any delivery fee or additional charge will be confirmed by the restaurant. The total shown here is your product subtotal.</p>
            <div className="br-checkout-brand-note">GOOD FOOD.<br /><em>ZERO QUIET.</em> ✳</div>
          </aside>
        </div>
      </section>
    </main>
  );
}
