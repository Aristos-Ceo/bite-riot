"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { MenuProduct } from "@/lib/menu-fallback";
import { useCart } from "@/components/cart-provider";
import { money } from "@/lib/money";
import { productImage } from "@/lib/bite-riot-images";

const categories = ["Sides & Starters", "Drinks", "Desserts", "Burgers", "Chicken & Wings"];
const everythingCategories = ["Burgers", "Chicken & Wings", "Sides & Starters", "Desserts", "Drinks", "Pizza", "Wraps & Sandwiches", "Milkshakes"];
const rotation = ["Everything", ...categories];

type HomeDiscoveryProps = { products: MenuProduct[] };

export function HomeDiscovery({ products }: HomeDiscoveryProps) {
  const { add } = useCart();
  const [activeCategory, setActiveCategory] = useState("Everything");
  const [activeProductId, setActiveProductId] = useState("");
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pauseTimer = useRef<number | null>(null);

  const visibleProducts = useMemo(() => {
    if (activeCategory === "Everything") {
      return everythingCategories
        .map((category) => products.find((product) => product.category === category))
        .filter((product): product is MenuProduct => Boolean(product))
        .slice(0, 4);
    }
    return products.filter((product) => product.category === activeCategory).slice(0, 4);
  }, [products, activeCategory]);

  const selectedProduct = visibleProducts.find((product) => product.id === activeProductId) ?? visibleProducts[0];
  const selectedImage = selectedProduct ? productImage(selectedProduct.slug, selectedProduct.image) : "";

  useEffect(() => {
    if (paused || hovered || rotation.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveCategory((current) => {
        const index = rotation.indexOf(current);
        return rotation[(index + 1) % rotation.length];
      });
      setActiveProductId("");
    }, 2500);
    return () => window.clearInterval(timer);
  }, [paused, hovered]);

  useEffect(() => () => {
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
  }, []);

  function pauseRotation() {
    setPaused(true);
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    pauseTimer.current = window.setTimeout(() => setPaused(false), 3000);
  }

  function selectCategory(category: string) {
    pauseRotation();
    setActiveCategory(category);
    setActiveProductId("");
  }

  function selectProduct(productId: string) {
    pauseRotation();
    setActiveProductId(productId);
  }

  if (!selectedProduct) return null;

  return (
    <section className="home-discovery" aria-labelledby="discovery-title">
      <div className="wrap">
        <div className="discovery-heading">
          <div><div className="eyebrow">02 / PICK YOUR KIND OF RIOT</div><h2 id="discovery-title" className="display">ONE CRAVING.<br /><em className="editorial">MANY WAYS.</em></h2></div>
          <p>Switch the craving. Explore the lineup. Find the bite that feels like yours.</p>
        </div>
        <div className="discovery-tabs" role="group" aria-label="Choose a food category" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onFocusCapture={() => setHovered(true)} onBlurCapture={() => setHovered(false)}>
          {rotation.map((category) => <button type="button" key={category} aria-pressed={activeCategory === category} className={activeCategory === category ? "active" : ""} onClick={() => selectCategory(category)}>{category}</button>)}
        </div>
        <div className="discovery-cycle-progress" aria-hidden="true">{rotation.map((category) => <span key={category} className={activeCategory === category ? "active" : ""} />)}</div>
        <div className="discovery-stage" aria-live="polite" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onFocusCapture={() => setHovered(true)} onBlurCapture={() => setHovered(false)}>
          <div className="discovery-visual">
            <div className="discovery-visual-top"><span>THE BITE RIOT SELECTION</span><span>{String(visibleProducts.length).padStart(2, "0")} BITES</span></div>
            <div className="discovery-image-wrap" key={selectedProduct.id}><img className="discovery-main-image" src={selectedImage} alt={selectedProduct.name} /></div>
            <span className="discovery-image-caption">GOOD FOOD. ZERO QUIET.</span>
          </div>
          <div className="discovery-details">
            <div className="eyebrow">{selectedProduct.category} / MADE FOR THE CRAVING</div>
            <div className="discovery-index"><span>YOUR NEXT FAVOURITE</span><span>{String(Math.max(1, visibleProducts.findIndex((product) => product.id === selectedProduct.id) + 1)).padStart(2, "0")} / {String(visibleProducts.length).padStart(2, "0")}</span></div>
            <h3 className="display discovery-product-name">{selectedProduct.name}</h3>
            <p className="discovery-description">{selectedProduct.description}</p>
            <div className="discovery-price">{money(selectedProduct.price)}</div>
            <div className="discovery-choice-label"><span>EXPLORE THIS CATEGORY</span><span>{visibleProducts.length} OPTIONS</span></div>
            <div className="discovery-options" role="group" aria-label="Choose a product">
              {visibleProducts.map((product) => <button type="button" key={product.id} className={`discovery-option ${product.id === selectedProduct.id ? "active" : ""}`} onClick={() => selectProduct(product.id)} aria-pressed={product.id === selectedProduct.id} aria-label={`Show ${product.name}`}><img src={productImage(product.slug, product.image)} alt="" /><span>{product.name}</span></button>)}
            </div>
            <div className="discovery-actions">
              <button type="button" className="btn dark" onClick={() => add({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, image: selectedImage })}>Add to bag <span aria-hidden="true">＋</span></button>
              <Link className="discovery-view-link" href={`/menu/${selectedProduct.slug}`}>View details ↗</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
