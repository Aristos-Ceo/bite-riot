"use client";
import { useEffect, useState } from "react";
import { sectionImages } from "@/lib/bite-riot-images";
import { BrandSticker } from "@/components/brand-sticker";
import { HeroBackgroundSlideshow } from "@/components/hero-background-slideshow";

const slides = [
  { image: sectionImages.burgerHero, label: "STACKED & SAUCY", name: "BURGERS" },
  { image: sectionImages.chickenHero, label: "CRISPY BUSINESS", name: "CHICKEN & WINGS" },
  { image: sectionImages.pizzaHero, label: "HOT FROM THE OVEN", name: "PIZZA" },
  { image: sectionImages.sidesHero, label: "THE SIDE QUEST", name: "SIDES & STARTERS" },
  { image: sectionImages.drinksHero, label: "SIP SOMETHING GOOD", name: "DRINKS" },
];
const menuHeroImages = slides.map((slide) => slide.image);

export function MenuHero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 2500);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section className="br-menu-hero" aria-label="Explore the BITE RIOT menu">
      <HeroBackgroundSlideshow images={menuHeroImages} activeIndex={active} label="BITE RIOT menu category photography" interval={2500} />
      <div className="br-menu-hero-shade" aria-hidden="true" />
      <div className="wrap br-menu-hero-content">
        <div className="eyebrow">THE FULL LINEUP / MADE FOR THE CRAVING</div>
        <p className="br-menu-hero-kicker">{slides[active].label}</p>
        <h1 className="display">THE MENU<br/><em>DOESN'T MISS.</em></h1>
        <p className="br-menu-hero-description">Big burgers, crispy business, oven-hot slices and something sweet for the road. Find your next favourite.</p>
        <a className="btn" href="#menu-categories">Find your craving ↓</a>
        <div className="br-menu-hero-count">0{active + 1} / 0{slides.length}</div>
      </div>
      <BrandSticker kind="burger" label="BITE RIOT burger character" className="br-menu-sticker" />
      <div className="br-menu-hero-progress" aria-hidden="true">
        {slides.map((slide, index) => <span key={slide.name} className={index === active ? "active" : ""}/>)}
      </div>
    </section>
  );
}
