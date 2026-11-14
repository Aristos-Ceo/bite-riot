const fs = require("fs");
const path = require("path");

const root = process.cwd();
const introPath = path.join(root, "src", "components", "site-intro.tsx");
const cssPath = path.join(root, "src", "app", "loader-mobile-polish.css");

for (const file of [introPath, cssPath]) {
  if (!fs.existsSync(file)) {
    console.error(`Cannot find ${path.relative(root, file)}. Open PowerShell in the BITE RIOT folder containing package.json and try again.`);
    process.exit(1);
  }
}

const intro = fs.readFileSync(introPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");

if (!intro.includes("RiotLoadingScreen") || !intro.includes("SiteIntro")) {
  console.error("The current site-intro.tsx does not match the expected BITE RIOT loader. No files were changed.");
  process.exit(1);
}
if (!css.includes(".br-loader")) {
  console.error("The current loader CSS does not contain .br-loader. No files were changed.");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDir = path.join(root, `.bite-riot-backup-${stamp}`);
fs.mkdirSync(backupDir, { recursive: true });
fs.copyFileSync(introPath, path.join(backupDir, "site-intro.tsx"));
fs.copyFileSync(cssPath, path.join(backupDir, "loader-mobile-polish.css"));

const newIntro = `"use client";

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
    <div
      className={\`br-loader\${intro ? " br-loader-intro" : " br-loader-route"}\`}
      role="status"
      aria-live="polite"
      aria-label="Loading BITE RIOT"
    >
      <div className="br-loader-topline" aria-hidden="true">
        <span>BITE RIOT</span>
        <span>GOOD FOOD. ZERO QUIET.</span>
      </div>

      <div className="br-loader-center">
        <span className="br-loader-index">INDEPENDENT FOOD. BIG FLAVOUR.</span>
        <RiotMark />
        <p className="br-loader-tagline">A LITTLE HEAT. A LOT OF ATTITUDE.</p>
        <div className="br-loader-progress" aria-hidden="true">
          <span />
        </div>
        <p className="br-loader-caption">PREPARING THE GOOD STUFF</p>
      </div>

      <div className="br-loader-bottomline" aria-hidden="true">
        <span>FRESHLY MADE</span>
        <span>EST. BITE RIOT</span>
      </div>
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
      // Continue without session storage when the browser blocks it.
    }

    const timer = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return <RiotLoadingScreen intro />;
}
`;

const cssAppend = `

/* BITE RIOT professional loader + strict left-aligned homepage hero */
.br-loader {
  --br-loader-ivory: #f5f0e5;
  --br-loader-lime: #b8e34a;
  --br-loader-orange: #f16d2d;
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: clamp(22px, 4vw, 54px) clamp(22px, 5.5vw, 82px);
  color: var(--br-loader-ivory);
  background: #102f24;
  isolation: isolate;
}
.br-loader::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: .16;
  background: linear-gradient(90deg, transparent 0 49.9%, rgba(245,240,229,.12) 50%, transparent 50.1%),
              linear-gradient(rgba(245,240,229,.07) 1px, transparent 1px);
  background-size: 100% 100%, 100% 92px;
}
.br-loader-topline,
.br-loader-bottomline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  color: rgba(245,240,229,.68);
  font: 700 9px/1.4 "DM Sans", sans-serif;
  letter-spacing: .2em;
}
.br-loader-topline span:first-child {
  color: var(--br-loader-lime);
  font-family: "Syne", sans-serif;
  font-size: 12px;
  letter-spacing: .12em;
}
.br-loader-center {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(88vw, 460px);
  margin: auto;
  text-align: center;
  animation: br-loader-clean-in .7s cubic-bezier(.2,.75,.25,1) both;
}
.br-loader-index {
  margin-bottom: 26px;
  color: var(--br-loader-lime);
  font: 700 9px/1.4 "DM Sans", sans-serif;
  letter-spacing: .24em;
}
.br-loader-mark {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Syne", sans-serif;
  font-weight: 900;
  letter-spacing: -.085em;
  line-height: .78;
}
.br-loader-mark-bite {
  color: var(--br-loader-ivory);
  font-size: clamp(52px, 10vw, 82px);
}
.br-loader-mark-riot {
  margin-top: 10px;
  color: var(--br-loader-lime);
  font-size: clamp(68px, 13vw, 108px);
  font-style: italic;
  letter-spacing: -.09em;
}
.br-loader-mark-riot span { color: var(--br-loader-orange); }
.br-loader-tagline {
  margin: 25px 0 30px;
  color: rgba(245,240,229,.78);
  font: 700 9px/1.5 "DM Sans", sans-serif;
  letter-spacing: .22em;
}
.br-loader-progress {
  width: min(66vw, 270px);
  height: 2px;
  overflow: hidden;
  border-radius: 0;
  background: rgba(245,240,229,.2);
}
.br-loader-progress span {
  display: block;
  width: 42%;
  height: 100%;
  border-radius: 0;
  background: var(--br-loader-lime);
  box-shadow: none;
  animation: br-loader-clean-progress 1.55s cubic-bezier(.65,0,.35,1) both;
}
.br-loader-caption {
  margin: 13px 0 0;
  color: rgba(245,240,229,.58);
  font: 700 8px/1.5 "DM Sans", sans-serif;
  letter-spacing: .2em;
}
.br-loader-intro {
  animation: br-loader-clean-exit .38s ease 1.42s both;
}
.br-loader-route { z-index: 9998; }
.br-loader-route .br-loader-center { transform: none; }
@keyframes br-loader-clean-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes br-loader-clean-progress {
  from { transform: translateX(-110%); }
  to { transform: translateX(260%); }
}
@keyframes br-loader-clean-exit {
  to { opacity: 0; visibility: hidden; pointer-events: none; }
}

/* The homepage hero copy stays left aligned at every breakpoint. */
.br-hero .br-hero-layout { text-align: left !important; }
.br-hero .br-hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  justify-content: center;
  text-align: left !important;
  margin-left: 0;
  margin-right: auto;
}
.br-hero .br-hero-copy > *,
.br-hero .br-hero-title,
.br-hero .br-hero-feature-copy,
.br-hero .br-hero-feature-copy p,
.br-hero .br-hero-eyebrow,
.br-hero .hero-actions,
.br-hero .hero-proof {
  text-align: left !important;
  align-self: flex-start;
}
.br-hero .hero-actions { justify-content: flex-start !important; }
@media (max-width: 700px) {
  .br-loader { padding: 20px 18px; }
  .br-loader-topline, .br-loader-bottomline { font-size: 7px; letter-spacing: .13em; }
  .br-loader-topline span:first-child { font-size: 10px; }
  .br-loader-center { width: min(90vw, 420px); align-items: flex-start; text-align: left; }
  .br-loader-index, .br-loader-mark, .br-loader-tagline, .br-loader-caption { text-align: left; }
  .br-loader-mark { align-items: flex-start; }
  .br-loader-progress { width: min(72vw, 270px); }
  .br-hero .br-hero-layout { display: block; }
  .br-hero .br-hero-copy {
    width: 100%;
    max-width: 100%;
    align-items: flex-start !important;
    text-align: left !important;
  }
  .br-hero .br-hero-title { text-align: left !important; }
}
@media (max-width: 360px) {
  .br-loader-topline span:last-child, .br-loader-bottomline span:last-child { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .br-loader-intro, .br-loader-center, .br-loader-progress span {
    animation: none !important;
  }
  .br-loader-intro { opacity: 0; visibility: hidden; }
}
`;

if (!css.includes("BITE RIOT professional loader + strict left-aligned homepage hero")) {
  fs.writeFileSync(cssPath, css + cssAppend, "utf8");
}
fs.writeFileSync(introPath, newIntro, "utf8");

console.log("BITE RIOT loader and homepage hero patch applied.");
console.log(`Backup saved in: ${path.relative(root, backupDir)}`);
console.log("Next: run npm.cmd run build. Do not deploy until the build passes.");
