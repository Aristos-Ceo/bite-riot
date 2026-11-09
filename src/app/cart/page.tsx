"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { HeroBackgroundSlideshow } from "@/components/hero-background-slideshow";
import { sectionImages } from "@/lib/bite-riot-images";
import { money } from "@/lib/money";

const cartHeroImages = [sectionImages.storySharing, sectionImages.burgerCategory, sectionImages.chickenCategory];

export default function Cart() {
  const { items, subtotal, change, hydrated } = useCart();

  return (
    <main className="br-cart-page">
      <section className="br-cart-hero">
        <HeroBackgroundSlideshow
          images={cartHeroImages}
          label="BITE RIOT food photography" interval={3200}
        />
        <div className="br-cart-hero-shade" />
        <div className="wrap br-cart-hero-content">
          <div className="eyebrow">YOUR NEXT GOOD DECISION / 01</div>
          <h1 className="display">THE GOOD<br /><em>STUFF.</em></h1>
          <p>Your bag, your way. Check the line-up, make it yours, then let’s get you fed.</p>
          <div className="br-cart-hero-foot"><span>GOOD FOOD. ZERO QUIET.</span><span>YOUR BAG ↗</span></div>
        </div>
      </section>

      <section className="br-cart-main section">
        <div className="wrap br-cart-layout">
          <div className="br-cart-items">
            <div className="br-cart-heading">
              <div><div className="eyebrow">02 / THE LINE-UP</div><h2 className="display">YOUR ORDER<span>.</span></h2></div>
              <span>{hydrated ? `${items.length} ${items.length === 1 ? "ITEM" : "ITEMS"}` : "LOADING BAG"}</span>
            </div>

            {!hydrated ? (
              <div className="br-cart-empty"><div className="br-cart-empty-icon"><ShoppingBag size={28} /></div><h3>Getting your bag ready…</h3></div>
            ) : items.length ? (
              <div className="br-cart-list">
                {items.map((item) => (
                  <article className="br-cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="br-cart-item-copy">
                      <span className="eyebrow">A VERY GOOD CHOICE</span>
                      <h3>{item.name}</h3>
                      <strong>{money(item.price)}</strong>
                      <div className="br-cart-quantity">
                        <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => change(item.id, -1)}><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button type="button" aria-label={`Increase ${item.name}`} onClick={() => change(item.id, 1)}><Plus size={14} /></button>
                        <button type="button" className="br-cart-remove" onClick={() => change(item.id, -item.quantity)}><Trash2 size={13} /> Remove</button>
                      </div>
                    </div>
                    <b className="br-cart-line-total">{money(item.price * item.quantity)}</b>
                  </article>
                ))}
                <Link className="br-continue-shopping" href="/menu"><ArrowLeft size={15} /> Keep exploring the menu</Link>
              </div>
            ) : (
              <div className="br-cart-empty">
                <div className="br-cart-empty-icon"><ShoppingBag size={28} /></div>
                <div className="eyebrow">NOTHING IN THE BAG. YET.</div>
                <h3>IT’S A LITTLE<br /><em>TOO QUIET.</em></h3>
                <p>Your next favourite is waiting. Find something worth making room for.</p>
                <Link className="btn" href="/menu">Explore the menu <ArrowRight size={16} /></Link>
              </div>
            )}
          </div>

          <aside className="br-cart-summary">
            <div className="eyebrow">03 / THE DAMAGE (IN A GOOD WAY)</div>
            <h2 className="display">ORDER<br /><em>SUMMARY.</em></h2>
            {hydrated && items.length ? (
              <>
                <div className="br-cart-summary-lines">
                  {items.map((item) => <div key={item.id}><span>{item.quantity} × {item.name}</span><b>{money(item.price * item.quantity)}</b></div>)}
                </div>
                <div className="br-cart-subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                <p className="br-cart-fee-note">Delivery fees and any applicable charges are confirmed during order handling. No hidden estimates added here.</p>
                <Link className="btn br-cart-checkout" href="/checkout">Continue to checkout <ArrowRight size={16} /></Link>
                <div className="br-cart-secure-note">✳ YOUR ORDER IS REVIEWED BEFORE IT'S CONFIRMED</div>
              </>
            ) : (
              <p className="br-cart-summary-placeholder">Your order summary will show up here when you add something delicious.</p>
            )}
            <div className="br-cart-help"><b>Need another minute?</b><span>Your bag stays on this device while you browse.</span></div>
          </aside>
        </div>
      </section>
    </main>
  );
}
