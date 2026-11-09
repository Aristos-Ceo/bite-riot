"use client";
import {useState} from "react";
import {useCart} from "@/components/cart-provider";
import {money} from "@/lib/money";
export function ProductDetailActions({product}:{product:{id:string;name:string;price:number;image:string}}){const {add}=useCart();const [qty,setQty]=useState(1);const [added,setAdded]=useState(false);return <div className="detail-actions"><div className="quantity-control"><button onClick={()=>setQty(q=>Math.max(1,q-1))} aria-label="Decrease quantity">−</button><b>{qty}</b><button onClick={()=>setQty(q=>Math.min(20,q+1))} aria-label="Increase quantity">+</button></div><button className="btn" onClick={()=>{for(let i=0;i<qty;i++)add(product);setAdded(true)}}>Add to bag · {money(product.price*qty)}</button>{added&&<p className="added-message" role="status">Added to your bag. Good choice.</p>}</div>}
