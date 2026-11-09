"use client";

import { useEffect, useState } from "react";
import { RiotLoadingScreen } from "@/components/riot-loading-screen";

const INTRO_KEY = "bite-riot-intro-seen";

export function SiteIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(INTRO_KEY) === "yes") return;
      setVisible(true);
      const timer = window.setTimeout(() => {
        setVisible(false);
        try { window.sessionStorage.setItem(INTRO_KEY, "yes"); } catch {}
      }, 3250);
      return () => window.clearTimeout(timer);
    } catch {
      setVisible(true);
      const timer = window.setTimeout(() => setVisible(false), 3250);
      return () => window.clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;
  return <div className="br-intro-overlay"><RiotLoadingScreen /></div>;
}
