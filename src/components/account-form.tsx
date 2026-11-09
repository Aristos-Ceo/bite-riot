"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CircleUserRound, PackageSearch, LogOut, Eye, EyeOff, UserRound, MapPin, Mail, Phone, ShieldCheck, Clock3, CheckCircle2, Chrome } from "lucide-react";

type Customer = { id: string; name: string; email: string; phone: string | null; address: string | null };
type Order = { reference: string; status: string; paymentStatus: string; total: number; createdAt: string; items: { name: string; quantity: number; unitPrice: number }[] };
const money = (amount: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);
const prettyStatus = (value: string) => value.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());

export function AccountForm() {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(""); const [password, setPassword] = useState(""); const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null); const [orders, setOrders] = useState<Order[]>([]); const [loading, setLoading] = useState(true);
  const loadAccount = useCallback(async () => {
    try { const response = await fetch("/api/account", { cache: "no-store" }); const data = await response.json();
      if (data.customer) { setCustomer(data.customer); setName(data.customer.name || ""); setEmail(data.customer.email || ""); setPhone(data.customer.phone || ""); setAddress(data.customer.address || ""); setOrders(data.orders || []); }
      else { setCustomer(null); setOrders([]); }
    } catch { setError("We couldn't load your account. Please refresh the page."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void loadAccount(); const onFocus = () => void loadAccount(); window.addEventListener("focus", onFocus); const googleResult = new URLSearchParams(window.location.search).get("google"); if (googleResult === "not-configured") setError("Google sign-in needs the store owner's Google OAuth credentials before it can be used."); else if (googleResult === "failed") setError("Google sign-in could not be completed. Please try again or use your email and password."); else if (googleResult === "success") setMessage("You're signed in with Google. Welcome to the RIOT."); return () => window.removeEventListener("focus", onFocus); }, [loadAccount]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/account", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: mode, name, email, phone, password }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Something went wrong.");
      setPassword(""); setMessage(data.message || "Your account is ready."); await loadAccount();
      window.dispatchEvent(new CustomEvent("bite-riot-auth-changed"));
      window.dispatchEvent(new CustomEvent("bite-riot-toast", { detail: { message: mode === "register" ? "Welcome to the RIOT." : "Welcome back." } }));
    } catch (err) { setError(err instanceof Error ? err.message : "Please try again."); }
    finally { setBusy(false); }
  }
  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try { const response = await fetch("/api/account", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, phone, address }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || "Could not save profile."); setCustomer(data.customer); setMessage(data.message); window.dispatchEvent(new CustomEvent("bite-riot-auth-changed")); }
    catch (err) { setError(err instanceof Error ? err.message : "Please try again."); } finally { setBusy(false); }
  }
  async function signOut() {
    await fetch("/api/account", { method: "DELETE" });
    window.dispatchEvent(new Event("bite-riot-cart-clear"));
    setCustomer(null);
    setOrders([]);
    setMode("login");
    setMessage("You have been signed out.");
    window.dispatchEvent(new CustomEvent("bite-riot-auth-changed"));
  }

  if (loading) return <main className="br-account-page"><section className="br-account-hero"><div className="wrap"><div className="eyebrow">THE BITE RIOT CLUB / YOUR CORNER</div><h1 className="display">YOUR RIOT.<br/><em>YOUR RULES.</em></h1><p>Getting your corner ready…</p></div></section></main>;

  return <main className="br-account-page">
    <section className="br-account-hero"><div className="wrap br-account-hero-inner">
      <div><div className="eyebrow">THE BITE RIOT CLUB / YOUR CORNER</div><h1 className="display">{customer ? <>YOUR RIOT.<br/><em>YOUR RULES.</em></> : <>GOOD TO<br/><em>SEE YOU.</em></>}</h1><p>{customer ? `Welcome back, ${customer.name.split(" ")[0]}. Your favourites, details and orders all in one place.` : "A little account. A lot more flavour. Join the club or sign back in to pick up where you left off."}</p></div>
      <div className="br-account-orbit" aria-hidden="true"><span>GOOD FOOD</span><b>✳</b><span>ZERO QUIET</span></div>
    </div></section>
    <section className="section br-account-main"><div className="wrap">
      {customer ? <div className="br-profile-grid">
        <section className="br-profile-card br-profile-main"><div className="br-profile-card-head"><div><div className="eyebrow">THE MEMBER AREA / 01</div><h2 className="display">YOUR<br/><em>PROFILE.</em></h2></div><div className="br-profile-avatar"><UserRound size={28}/></div></div>
          <form className="br-account-form br-profile-form" onSubmit={saveProfile}>
            <label>FULL NAME<input required minLength={2} autoComplete="name" value={name} onChange={(e)=>setName(e.target.value)} /></label>
            <label>EMAIL ADDRESS<input type="email" value={customer.email} readOnly /></label>
            <label>PHONE NUMBER<input type="tel" autoComplete="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+234…" /></label>
            <label>DELIVERY ADDRESS<textarea autoComplete="street-address" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Street, area and helpful directions" rows={3}/></label>
            <button className="btn" type="submit" disabled={busy}>{busy ? "SAVING…" : "SAVE MY DETAILS ↗"}</button>
          </form>
          <div className="br-profile-security"><ShieldCheck size={17}/><span>Your account is protected. Your password is stored securely and never shown in your profile.</span></div>
        </section>
        <section className="br-profile-card br-profile-orders"><div className="eyebrow">THE GOOD STUFF / 02</div><h2 className="display">ORDER<br/><em>HISTORY.</em></h2>
          {orders.length ? <div className="br-order-history">{orders.map((order)=><article className="br-order-history-item" key={order.reference}><div className="br-order-history-top"><b>{order.reference}</b><span className="br-order-status">{prettyStatus(order.status)}</span></div><p>{order.items.map((item)=>`${item.quantity} × ${item.name}`).join(" · ")}</p><div className="br-order-history-bottom"><span>{new Date(order.createdAt).toLocaleDateString("en-NG",{day:"numeric",month:"short",year:"numeric"})}</span><strong>{money(order.total)}</strong></div><Link href={`/track?reference=${encodeURIComponent(order.reference)}`}>Track this order <ArrowRight size={14}/></Link></article>)}</div> : <div className="br-profile-empty"><PackageSearch size={28}/><b>NO ORDERS. YET.</b><p>Your next favourite meal is waiting.</p><Link className="btn dark" href="/menu">Explore the menu <ArrowRight size={15}/></Link></div>}
          <div className="br-profile-shortcuts"><Link href="/cart"><PackageSearch size={16}/> Your bag <ArrowRight size={14}/></Link><Link href="/track"><Clock3 size={16}/> Track an order <ArrowRight size={14}/></Link></div>
        </section>
        <div className="br-profile-signout"><span>Member since {new Date().getFullYear()}</span><button type="button" onClick={signOut}><LogOut size={15}/> Sign out</button></div>
      </div> : <div className="br-account-auth-layout">
        <article className="br-account-auth-card"><div className="br-account-auth-top"><CircleUserRound size={29}/><div className="eyebrow">CUSTOMER ACCOUNT / THE RIOT CLUB</div></div>
          <div className="br-account-form-tabs"><button type="button" className={mode === "register" ? "active" : ""} onClick={()=>{setMode("register");setError("");setMessage("");}}>Create account</button><button type="button" className={mode === "login" ? "active" : ""} onClick={()=>{setMode("login");setError("");setMessage("");}}>Already have an account? Log in</button></div>
          <h2 className="display">{mode === "register" ? <>JOIN THE<br/><em>RIOT.</em></> : <>WELCOME<br/><em>BACK.</em></>}</h2>
          <p className="br-account-auth-intro">{mode === "register" ? "Create your account to save your details, make ordering easier and keep every order in one place." : "Your table's waiting. Sign in to see your details and order history."}</p>
          <a className="br-google-button" href="/api/auth/google"><Chrome size={18}/> Continue with Google <ArrowRight size={15}/></a>
          <div className="br-account-divider"><span>OR WITH EMAIL</span></div>
          <form className="br-account-form" onSubmit={submit}>
            {mode === "register" && <label>FULL NAME<input required minLength={2} autoComplete="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your full name"/></label>}
            <label>EMAIL ADDRESS<input required type="email" autoComplete="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
            {mode === "register" && <label>PHONE NUMBER <span className="br-optional">(OPTIONAL)</span><input type="tel" autoComplete="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+234…"/></label>}
            <label>PASSWORD<div className="br-password-wrap"><input required type={showPassword ? "text" : "password"} minLength={8} autoComplete={mode === "register" ? "new-password" : "current-password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder={mode === "register" ? "At least 8 characters, 1 uppercase" : "Your password"}/><button type="button" className="br-password-toggle" onClick={()=>setShowPassword((value)=>!value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}<span>{showPassword ? "Hide" : "Show"}</span></button></div></label>
            {mode === "register" && <p className="br-password-hint">Use at least 8 characters and include one uppercase letter.</p>}
            <button className="btn br-account-submit" type="submit" disabled={busy}>{busy ? "PLEASE WAIT…" : mode === "register" ? "CREATE MY ACCOUNT ↗" : "SIGN IN ↗"}</button>
          </form>
          {error && <p className="br-account-feedback" role="alert">{error}</p>}{message && <p className="br-account-feedback" role="status">{message}</p>}
          <p className="br-account-security">By continuing, you agree to use your account responsibly. Your password is securely hashed and never sent by email.</p>
        </article>
        <aside className="br-account-side-card"><div className="eyebrow">A SEAT WITH YOUR NAME ON IT</div><h3 className="display">MORE YOU.<br/><em>LESS TYPING.</em></h3><div className="br-account-benefit"><UserRound/><span><b>Your details, saved.</b><small>Keep your contact and delivery info ready for next time.</small></span></div><div className="br-account-benefit"><PackageSearch/><span><b>Your orders, together.</b><small>See past orders and check their progress.</small></span></div><div className="br-account-benefit"><MapPin/><span><b>Your corner.</b><small>A personal profile made for your BITE RIOT visits.</small></span></div><div className="br-account-side-stamp">BITE<br/>RIOT <b>✳</b></div></aside>
      </div>}
      {error && customer && <p className="br-account-feedback" role="alert">{error}</p>}{message && customer && <p className="br-account-feedback" role="status">{message}</p>}
      <div className="br-account-track-note"><PackageSearch size={18}/><span>Already placed an order? You can also <Link href="/track">track it with your order reference</Link>.</span></div>
    </div></section>
  </main>;
}
