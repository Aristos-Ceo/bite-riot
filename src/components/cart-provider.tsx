"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type Ctx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  add: (p: Omit<CartItem, "quantity">) => void;
  change: (id: string, delta: number) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("bite-riot-cart");
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((item) =>
            item && typeof item.id === "string" &&
            typeof item.name === "string" &&
            Number.isFinite(item.price) &&
            Number.isFinite(item.quantity) &&
            item.quantity > 0
          ));
        }
      }
    } catch {
      try { window.localStorage.removeItem("bite-riot-cart"); } catch { /* Storage may be disabled by the browser. */ }
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("bite-riot-cart", JSON.stringify(items));
  }, [items, hydrated]);

  // A signed-out customer must never leave their bag behind for the next visitor.
  useEffect(() => {
    const clearBagOnSignOut = () => {
      setItems([]);
      try { window.localStorage.removeItem("bite-riot-cart"); } catch { /* Storage may be disabled by the browser. */ }
    };
    window.addEventListener("bite-riot-cart-clear", clearBagOnSignOut);
    return () => window.removeEventListener("bite-riot-cart-clear", clearBagOnSignOut);
  }, []);

  const value = useMemo<Ctx>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    hydrated,
    add: (product) => {
      if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("bite-riot-toast", { detail: { message: `${product.name} added to your bag.` } }));
      setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item)
        : [...current, { ...product, quantity: 1 }];
      });
    },
    change: (id, delta) => {
      if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("bite-riot-toast", { detail: { message: delta > 0 ? "Bag quantity updated." : "Bag updated." } }));
      setItems((current) => current
        .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter((item) => item.quantity > 0));
    },
    clear: () => setItems([]),
  }), [items, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be inside CartProvider");
  return context;
}
