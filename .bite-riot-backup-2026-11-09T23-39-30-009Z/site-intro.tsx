"use client";

import { useEffect, useState } from "react";

function RiotMark() {
  return (
    <div className="br-loader-mark" aria-label="BITE RIOT">
      <span className="br-loader-mark-bite">BITE</span>
      <span className="br-loader-mark-riot">RIOT<span>.</span></span>
    </div>
  );
}

export function RiotLoadingScreen({ intro = false }: { intro?: boolean }) {
  return (
    <div className={`br-loader${intro ? " br-loader-intro" : " br-loader-route"}`} role="status" aria-live="polite">
      <div className="br-loader-grain" aria-hidden="true" />
      <div className="br-loader-glow br-loader-glow-one" aria-hidden="true" />
      <div className="br-loader-glow br-loader-glow-two" aria-hidden="true" />
      <div className="br-loader-orbit br-loader-orbit-one" aria-hidden="true"><i /></div>
      <div className="br-loader-orbit br-loader-orbit-two" aria-hidden="true"><i /></div>
      <span className="br-loader-spark br-loader-spark-one" aria-hidden="true">✳</span>
      <span className="br-loader-spark br-loader-spark-two" aria-hidden="true">✦</span>
      <span className="br-loader-food br-loader-food-one" aria-hidden="true">🌶️</span>
      <span className="br-loader-food br-loader-food-two" aria-hidden="true">🍟</span>
      <span className="br-loader-food br-loader-food-three" aria-hidden="true">🍔</span>
      <div className="br-loader-center">
        <div className="br-loader-emblem" aria-hidden="true"><span>✳</span></div>
        <RiotMark />
        <p className="br-loader-tagline">A LITTLE HEAT. A LOT OF ATTITUDE.</p>
        <div className="br-loader-progress" aria-hidden="true"><span /></div>
        <p className="br-loader-caption">GETTING THE GOOD STUFF READY<span className="br-loader-dots">...</span></p>
      </div>
      <span className="br-loader-corner br-loader-corner-left">FRESHLY MADE</span>
      <span className="br-loader-corner br-loader-corner-right">ZERO QUIET ✳</span>
    </div>
  );
}

export function SiteIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const key = "bite-riot-intro-seen";
    try {
      if (window.sessionStorage.getItem(key) === "yes") {
        setVisible(false);
        return;
      }
      window.sessionStorage.setItem(key, "yes");
    } catch {
      // If storage is unavailable, still show the intro once for this mount.
    }
    const timer = window.setTimeout(() => setVisible(false), 3250);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return <RiotLoadingScreen intro />;
}
