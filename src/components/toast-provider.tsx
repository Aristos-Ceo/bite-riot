"use client";
import { useEffect, useState } from "react";

type Toast = { id: number; message: string };
export function ToastProvider() {
  const [items, setItems] = useState<Toast[]>([]);
  useEffect(() => {
    const onToast = (event: Event) => {
      const message = (event as CustomEvent<{ message?: string }>).detail?.message;
      if (!message) return;
      const id = Date.now() + Math.random();
      setItems((current) => [...current.slice(-2), { id, message }]);
      window.setTimeout(() => setItems((current) => current.filter((item) => item.id !== id)), 3200);
    };
    window.addEventListener("bite-riot-toast", onToast);
    return () => window.removeEventListener("bite-riot-toast", onToast);
  }, []);
  return <div className="br-toast-region" aria-live="polite" aria-atomic="false">
    {items.map((item) => <div className="br-toast" key={item.id}><span className="br-toast-mark">✓</span>{item.message}</div>)}
  </div>;
}
