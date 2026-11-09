"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  useEffect(() => { setToken(new URLSearchParams(window.location.search).get("token") || ""); }, []);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setMessage("");
    if (password !== confirm) { setError("Your passwords do not match."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/auth/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "reset", token, password }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "This reset link cannot be used.");
      setMessage(data.message || "Your password has been changed."); setPassword(""); setConfirm("");
    } catch (err) { setError(err instanceof Error ? err.message : "Please request another reset link."); }
    finally { setBusy(false); }
  }
  return <main className="br-account-page"><section className="br-account-hero"><div className="wrap"><div className="eyebrow">THE BITE RIOT CLUB / ACCOUNT HELP</div><h1 className="display">A FRESH<br/><em>START.</em></h1><p>Choose a new password for your account.</p></div></section><section className="section"><div className="wrap br-account-options br-password-reset-layout"><article className="br-account-auth-card"><div className="br-account-auth-top"><LockKeyhole size={28}/><div className="eyebrow">CHOOSE A NEW PASSWORD</div></div><h2 className="display">MAKE IT<br/><em>YOURS.</em></h2>{!token ? <p className="br-account-feedback" role="alert">This reset link is missing. Request a new one.</p> : <form className="br-account-form" onSubmit={submit}><label>NEW PASSWORD<div className="br-password-wrap"><input required minLength={8} type={show ? "text" : "password"} autoComplete="new-password" value={password} onChange={(event)=>setPassword(event.target.value)} placeholder="At least 8 characters and 1 uppercase"/><button type="button" className="br-password-toggle" onClick={()=>setShow((value)=>!value)} aria-label={show ? "Hide password" : "Show password"}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}<span>{show ? "Hide" : "Show"}</span></button></div></label><label>CONFIRM NEW PASSWORD<input required minLength={8} type={show ? "text" : "password"} autoComplete="new-password" value={confirm} onChange={(event)=>setConfirm(event.target.value)} placeholder="Enter the new password again"/></label><p className="br-password-hint">Use at least 8 characters and include one uppercase letter.</p><button className="btn br-account-submit" type="submit" disabled={busy}>{busy ? "UPDATING…" : "SAVE NEW PASSWORD ↗"}</button></form>}{error && <p className="br-account-feedback" role="alert">{error}</p>}{message && <p className="br-account-feedback" role="status">{message}</p>}<Link href="/account" className="br-forgot-back"><ArrowLeft size={15}/> Back to sign in</Link></article></div></section></main>;
}
