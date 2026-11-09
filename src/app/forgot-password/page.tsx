"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/auth/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "request", email }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We couldn't process that request.");
      setMessage(data.message || "If an account exists for that email, a reset link will be sent shortly.");
    } catch (err) { setError(err instanceof Error ? err.message : "Please try again."); }
    finally { setBusy(false); }
  }
  return <main className="br-account-page"><section className="br-account-hero"><div className="wrap"><div className="eyebrow">THE BITE RIOT CLUB / ACCOUNT HELP</div><h1 className="display">FORGOT<br/><em>YOUR PASSWORD?</em></h1><p>It happens. Let's get you back to the good stuff.</p></div></section><section className="section"><div className="wrap br-account-options br-password-reset-layout"><article className="br-account-auth-card"><div className="br-account-auth-top"><Mail size={28}/><div className="eyebrow">PASSWORD RESET</div></div><h2 className="display">GET BACK<br/><em>IN THE RIOT.</em></h2><p className="br-account-auth-intro">Enter the email address linked to your account. If it matches, we'll send you a secure reset link.</p><form className="br-account-form" onSubmit={submit}><label>EMAIL ADDRESS<input required type="email" autoComplete="email" value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="you@example.com"/></label><button className="btn br-account-submit" type="submit" disabled={busy}>{busy ? "SENDING…" : "SEND RESET LINK ↗"}</button></form>{error && <p className="br-account-feedback" role="alert">{error}</p>}{message && <p className="br-account-feedback" role="status">{message}</p>}<p className="br-account-security"><ShieldCheck size={15}/> Reset links expire after 30 minutes and can only be used once.</p><Link href="/account" className="br-forgot-back"><ArrowLeft size={15}/> Back to sign in</Link></article></div></section></main>;
}
