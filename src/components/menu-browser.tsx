"use client";
import { useMemo, useState, useEffect } from "react";
import { ProductGrid } from "./product-grid";
import { sectionImages } from "@/lib/bite-riot-images";
import type { MenuProduct } from "@/lib/menu-fallback";

const categories = [
  { name: "Burgers", id: "burgers", tag: "STACKED & SAUCY", image: sectionImages.burgerCategory },
  { name: "Chicken & Wings", id: "chicken-wings", tag: "CRISPY BUSINESS", image: sectionImages.chickenCategory },
  { name: "Pizza", id: "pizza", tag: "HOT FROM THE OVEN", image: sectionImages.pizzaCategory },
  { name: "Sides & Starters", id: "sides-starters", tag: "THE SIDE QUEST", image: sectionImages.sidesCategory },
  { name: "Wraps & Sandwiches", id: "wraps-sandwiches", tag: "GOOD THINGS WRAPPED", image: sectionImages.wrapsCategory },
  { name: "Drinks", id: "drinks", tag: "COLD & REFRESHING", image: sectionImages.drinksCategory },
  { name: "Milkshakes", id: "milkshakes", tag: "THICK, COLD, LOUD", image: sectionImages.milkshakesCategory },
  { name: "Desserts", id: "desserts", tag: "SAVE A LITTLE ROOM", image: sectionImages.dessertsCategory },
];

export function MenuBrowser({ products, loadError = false }: { products: MenuProduct[]; loadError?: boolean }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState("burgers");
  const catalog = products;
  const grouped = useMemo(() => categories.map((category) => ({
    ...category,
    products: catalog.filter((p) => p.category === category.name && `${p.name} ${p.description}`.toLowerCase().includes(q.toLowerCase())),
  })), [catalog, q]);

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("category");
    const match = categories.find((c) => c.name === wanted);
    if (match) {
      setActive(match.id);
      requestAnimationFrame(() => document.getElementById(`menu-${match.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, []);

  const jumpTo = (id: string) => {
    setActive(id);
    document.getElementById(`menu-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="br-menu-categories" id="menu-categories">
        <div className="br-menu-section-heading">
          <div><div className="eyebrow">01 / FIND YOUR FAVOURITE</div><h2 className="display">PICK YOUR <em>PLEASURE.</em></h2></div>
          <p>Eight ways into a very good meal. Choose a craving and jump straight to the good stuff.</p>
        </div>
        <div className="br-menu-category-grid">
          {categories.map((c, i) => (
            <button type="button" key={c.id} aria-pressed={active === c.id} className={`br-menu-category ${active === c.id ? "is-active" : ""}`} onClick={() => jumpTo(c.id)}>
              <img src={c.image} alt="" loading="lazy"/>
              <span className="br-menu-category-number">0{i + 1}</span>
              <span className="br-menu-category-copy"><small>{c.tag}</small><b>{c.name}</b></span>
              <span className="br-menu-category-arrow" aria-hidden="true">↘</span>
            </button>
          ))}
        </div>
      </div>

      <div className="br-menu-browser">
        {loadError ? <div className="br-menu-load-error" role="status"><b>The menu is having a moment.</b><p>We could not read the menu data just now. Your saved products have not been changed. Please refresh the page or try again shortly.</p><button type="button" onClick={() => window.location.reload()}>Refresh menu ↻</button></div> : null}
        {!loadError && catalog.length === 0 ? <div className="br-menu-load-error" role="status"><b>No menu items are available right now.</b><p>The menu categories are still here. Please check back shortly.</p></div> : null}
        <div className="br-menu-toolbar">
          <div><div className="eyebrow">02 / THE FULL LINEUP</div><h2 className="display">GOOD THINGS.<br/><em>NO SHORTCUTS.</em></h2></div>
          <label className="br-menu-search"><span>SEARCH THE MENU</span><input className="search" placeholder="Try burgers, wings, something sweet..." aria-label="Search menu" value={q} onChange={(e) => setQ(e.target.value)}/></label>
        </div>
        <nav className="br-menu-sticky-nav" aria-label="Jump to menu category">
          {categories.map((c) => <button key={c.id} className={active === c.id ? "active" : ""} onClick={() => jumpTo(c.id)}>{c.name}</button>)}
        </nav>
        {grouped.map((category, i) => (
          <section className="br-menu-product-section" id={`menu-${category.id}`} key={category.id}>
            <div className="br-menu-product-heading">
              <div><span>0{i + 1} / {category.tag}</span><h3 className="display">{category.name}</h3></div>
              <span>{category.products.length} {category.products.length === 1 ? "bite" : "bites"}</span>
            </div>
            {category.products.length ? <ProductGrid products={category.products}/> : <p className="br-menu-no-results">No bites found here. Try another search or choose a different category.</p>}
          </section>
        ))}
      </div>
    </>
  );
}
