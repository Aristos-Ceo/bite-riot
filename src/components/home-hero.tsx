"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HeroBackgroundSlideshow } from "@/components/hero-background-slideshow";
import { sectionImages } from "@/lib/bite-riot-images";

const slides = [
  { eyebrow:"GOOD FOOD. ZERO QUIET.", name:"THE RIOT CLASSIC", line:"MADE FOR THE CRAVING", description:"For the hungry, the bold and the slightly rebellious. Big flavour, proper comfort and a little extra attitude in every bite.", image:sectionImages.burgerCategory, categories:"BURGERS / PIZZA / CHICKEN / MORE", accent:"01" },
  { eyebrow:"CRUNCH WITH AN ATTITUDE.", name:"CRISPY RIOT WINGS", line:"A LITTLE HEAT. A LOT OF CRUNCH.", description:"Golden, gloriously crunchy and ready to bring a little chaos to your taste buds. This is how wings should be.", image:sectionImages.homeChicken, categories:"WINGS / SAUCES / SIDES / MORE", accent:"02" },
  { eyebrow:"STRAIGHT FROM THE OVEN.", name:"PEPPERONI RIOT", line:"HOT. LOADED. UNAPOLOGETIC.", description:"A proper pizza moment: rich, cheesy, generously topped and always worth gathering around.", image:sectionImages.pizzaCategory, categories:"PIZZA / CHEESE / GOOD TIMES", accent:"03" },
  { eyebrow:"SIDES THAT STEAL THE SHOW.", name:"LOADED RIOT FRIES", line:"NOT HERE TO PLAY SECOND.", description:"Crispy comfort piled high with the good stuff. The side dish that refuses to stay on the sidelines.", image:sectionImages.sidesCategory, categories:"FRIES / SIDES / EXTRA SAUCE", accent:"04" },
  { eyebrow:"SAVE A LITTLE ROOM.", name:"CHOCOLATE RIOT SHAKE", line:"SIP SOMETHING UNREASONABLE.", description:"Cool, creamy and unapologetically chocolatey. Every good food story deserves a sweet finish.", image:sectionImages.milkshakesCategory, categories:"SHAKES / SWEET THINGS / MORE", accent:"05" },
  { eyebrow:"THE SWEET SIDE OF THE RIOT.", name:"DESSERT AFTER DARK", line:"ONE MORE BITE. ALWAYS.", description:"A little something sweet to finish a very good decision. Because nobody said the good stuff had to stop at dinner.", image:sectionImages.homeDesserts, categories:"DESSERTS / TREATS / GOOD MOODS", accent:"06" },
  { eyebrow:"MADE FOR THE MIDDLE OF THE TABLE.", name:"THE SHARING MOMENT", line:"GOOD FOOD. BETTER COMPANY.", description:"Pass the plate, steal a fry and make room for one more. The best moments are always better shared.", image:sectionImages.storySharing, categories:"SHARING / COMBOS / GOOD COMPANY", accent:"07" },
];
const homeHeroImages = slides.map((item) => item.image);

export function HomeHero() {
  const [active,setActive] = useState(0);
  const slide = slides[active];
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const timer=window.setInterval(()=>setActive(v=>(v+1)%slides.length),2300); return ()=>window.clearInterval(timer); },[]);
  return <section className="br-hero br-hero-background-mode" aria-label="BITE RIOT featured menu">
    <HeroBackgroundSlideshow images={homeHeroImages} label="BITE RIOT food photography" interval={2300} activeIndex={active}/>
    <div className="wrap br-hero-layout">
      <div className="br-hero-copy">
        <div className="eyebrow br-hero-eyebrow"><span className="pulse-dot"/><span key={`eyebrow-${slide.accent}`} className="br-hero-change">{slide.eyebrow}</span></div>
        <h1 className="display br-hero-title">BITE<br/><em>RIOT.</em></h1>
        <div className="br-hero-feature-copy" key={`copy-${slide.accent}`}><span>{slide.line}</span><p>{slide.description}</p></div>
        <div className="hero-actions"><Link className="btn" href="/menu">Order something good ↗</Link><Link className="btn ghost" href="/combos">Find your combo</Link></div>
        <div className="hero-proof"><span>✳ FRESHLY MADE</span><span>✳ BIG FLAVOUR</span><span>✳ GOOD COMPANY</span></div>
      </div>
      <div className="br-hero-side-note"><span>NOW SERVING</span><strong>{slide.name}</strong><small>{slide.categories}</small></div>
    </div>
    <div className="br-hero-bottomline"><span key={`categories-${slide.accent}`} className="br-hero-change">{slide.categories}</span><div className="br-hero-progress" aria-label={`Slide ${active+1} of ${slides.length}`}>{slides.map((item,index)=><span key={item.accent} className={index===active?"active":""}/>)}</div><span>SCROLL FOR THE GOOD STUFF ↓</span></div>
  </section>;
}
