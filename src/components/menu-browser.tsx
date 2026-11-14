
"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductGrid } from "./product-grid";
import type { MenuProduct } from "@/lib/menu-fallback";

const categories = [
  { name: "Burgers", id: "burgers", tag: "STACKED & SAUCY" },
  { name: "Chicken & Wings", id: "chicken-wings", tag: "CRISPY BUSINESS" },
  { name: "Pizza", id: "pizza", tag: "HOT FROM THE OVEN" },
  { name: "Sides & Starters", id: "sides-starters", tag: "THE SIDE QUEST" },
  { name: "Wraps & Sandwiches", id: "wraps-sandwiches", tag: "GOOD THINGS WRAPPED" },
  { name: "Drinks", id: "drinks", tag: "COLD & REFRESHING" },
  { name: "Milkshakes", id: "milkshakes", tag: "THICK, COLD, LOUD" },
  { name: "Desserts", id: "desserts", tag: "SAVE A LITTLE ROOM" },
];

export function MenuBrowser({
  products,
  loadError = false,
}: {
  products: MenuProduct[];
  loadError?: boolean;
}) {
  const [active, setActive] = useState("burgers");
  const [q, setQ] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("featured");

  const activeCategory =
    categories.find((category) => category.id === active) ?? categories[0];

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("category");
    if (!wanted) return;

    const match = categories.find(
      (category) =>
        category.id === wanted ||
        category.name.toLowerCase() === wanted.toLowerCase()
    );

    if (match) setActive(match.id);
  }, []);

  function selectCategory(id: string) {
    setActive(id);
    setQ("");
    setPriceRange("all");
    setSort("featured");

    const url = new URL(window.location.href);
    url.searchParams.set("category", id);
    window.history.replaceState({}, "", url);
  }

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (product) => product.category === activeCategory.name
    );

    const query = q.trim().toLowerCase();

    if (query) {
      result = result.filter((product) =>
        `${product.name} ${product.description}`
          .toLowerCase()
          .includes(query)
      );
    }

    if (priceRange === "under-5000") {
      result = result.filter((product) => product.price < 5000);
    } else if (priceRange === "5000-10000") {
      result = result.filter(
        (product) => product.price >= 5000 && product.price <= 10000
      );
    } else if (priceRange === "over-10000") {
      result = result.filter((product) => product.price > 10000);
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, activeCategory.name, q, priceRange, sort]);

  return (
    <div className="br-menu-browser">
      {loadError && (
        <div className="br-menu-load-error" role="status">
          <b>The menu is having a moment.</b>
          <p>Please refresh the page or try again shortly.</p>
        </div>
      )}

      <div className="br-menu-toolbar">
        <div>
          <div className="eyebrow">01 / FIND YOUR FAVOURITE</div>
          <h2 className="display">
            PICK YOUR <em>PLEASURE.</em>
          </h2>
        </div>
        <p>One craving at a time. Find your next favourite.</p>
      </div>

      <div className="br-menu-controls">
        <label className="br-menu-search">
          <span>SEARCH THE MENU</span>
          <input
            className="search"
            placeholder="Try burgers, wings, something sweet..."
            aria-label="Search menu"
            value={q}
            onChange={(event) => setQ(event.target.value)}
          />
        </label>

        <label className="br-menu-filter">
          <span>PRICE RANGE</span>
          <select
            value={priceRange}
            onChange={(event) => setPriceRange(event.target.value)}
          >
            <option value="all">All prices</option>
            <option value="under-5000">Under ₦5,000</option>
            <option value="5000-10000">₦5,000–₦10,000</option>
            <option value="over-10000">Over ₦10,000</option>
          </select>
        </label>

        <label className="br-menu-filter">
          <span>SORT BY</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <nav className="br-menu-sticky-nav" role="tablist" aria-label="Menu categories">
        {categories.map((category) => (
          <button
            type="button"
            role="tab"
            key={category.id}
            aria-selected={active === category.id}
            aria-controls="menu-active-products"
            className={active === category.id ? "active" : ""}
            onClick={() => selectCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </nav>

      <section
        id="menu-active-products"
        role="tabpanel"
        aria-live="polite"
        className="br-menu-product-section br-menu-panel-enter"
        key={activeCategory.id}
      >
        <div className="br-menu-product-heading">
          <div>
            <span>01 / {activeCategory.tag}</span>
            <h3 className="display">{activeCategory.name}</h3>
          </div>
          <span>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "bite" : "bites"}
          </span>
        </div>

        {filteredProducts.length ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <p className="br-menu-no-results">
            No bites found here. Try changing your search or filters.
          </p>
        )}
      </section>
    </div>
  );
}
