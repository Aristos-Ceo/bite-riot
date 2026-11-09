"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu as MenuIcon, X, ArrowUpRight, UserRound } from "lucide-react";
import { useCart } from "./cart-provider";
const links = [["Home", "/"], ["Menu", "/menu"], ["Combos", "/combos"], ["Offers", "/offers"], ["Our Story", "/story"]];
export function SiteHeader() {
  const { count } = useCart(); const [open, setOpen] = useState(false); const [signedIn, setSignedIn] = useState(false);
  useEffect(() => { let active = true; const check = () => fetch("/api/account", { cache: "no-store" }).then((r)=>r.json()).then((data)=>{if(active)setSignedIn(Boolean(data.customer));}).catch(()=>undefined); void check(); const refresh=()=>void check(); window.addEventListener("bite-riot-auth-changed",refresh); return ()=>{active=false;window.removeEventListener("bite-riot-auth-changed",refresh);}; }, []);
  const accountLabel = signedIn ? "My profile" : "Sign in";
  return <header className="header"><div className="wrap nav">
    <Link className="brand" href="/" aria-label="BITE RIOT home" onClick={()=>setOpen(false)}><img src="/images/brand/bite-riot-mark.svg" alt="BITE RIOT — Good food. Zero quiet."/></Link>
    <nav className="navlinks" aria-label="Main navigation">{links.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav>
    <div className="nav-actions"><Link className="nav-account" href="/account"><UserRound size={15}/><span>{accountLabel}</span></Link><Link className="navbtn" href="/cart"><ShoppingBag size={15}/> Bag <span className="bag-count">{count}</span></Link><button className="mobile-menu-toggle" onClick={()=>setOpen((value)=>!value)} aria-label={open?"Close menu":"Open menu"} aria-expanded={open}>{open?<X/>:<MenuIcon/>}</button></div>
  </div>{open&&<div className="mobile-menu"><div className="mobile-menu-inner">{[...links,[accountLabel,"/account"],["Your bag","/cart"],["Track order","/track"]].map(([label,href],index)=><Link key={href} href={href} onClick={()=>setOpen(false)}><span>0{index+1}</span>{label}<ArrowUpRight size={17}/></Link>)}<p>GOOD FOOD. ZERO QUIET.</p></div></div>}</header>;
}
