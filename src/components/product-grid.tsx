"use client";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { money } from "@/lib/money";
import type { MenuProduct } from "@/lib/menu-fallback";
import { Reveal } from "./reveal";
import { productImage } from "@/lib/bite-riot-images";

export function ProductGrid({ products }: { products: MenuProduct[] }) {
  const { add } = useCart();
  return <div className="grid br-product-grid">
    {products.map((p, i) => {
      const image = productImage(p.slug, p.image);
      return <Reveal className="product-reveal" key={p.id} delay={(i % 4) * 55}>
        <article className="product br-product-card">
          <Link className="product-img" href={`/menu/${p.slug}`} aria-label={`View ${p.name}`}>
            <img src={image} alt={p.name} loading="lazy"/>
            <span className="product-view">VIEW BITE ↗</span>
          </Link>
          <div className="product-info">
            <div className="eyebrow" style={{fontSize:8,marginBottom:7}}>{p.category}</div>
            <h3><Link href={`/menu/${p.slug}`}>{p.name}</Link></h3>
            <p>{p.description}</p>
            <div className="product-foot"><span className="price">{money(p.price)}</span>
              <button className="add" aria-label={`Add ${p.name}`} onClick={() => add({id:p.id,name:p.name,price:p.price,image})}>+</button>
            </div>
          </div>
        </article>
      </Reveal>;
    })}
  </div>;
}
