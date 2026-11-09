"use client";
import {useEffect,useRef} from "react";
export function Reveal({children,className="",delay=0}:{children:React.ReactNode;className?:string;delay?:number}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const el=ref.current;if(!el)return;const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(reduce){el.classList.add("is-visible");return;}const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){el.classList.add("is-visible");observer.unobserve(el)}},{threshold:.12,rootMargin:"0px 0px -45px 0px"});observer.observe(el);return()=>observer.disconnect()},[]);
 return <div ref={ref} className={`reveal ${className}`} style={{"--reveal-delay":`${delay}ms`} as React.CSSProperties}>{children}</div>
}
