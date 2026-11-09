import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { sectionImages } from "@/lib/bite-riot-images";
import { HeroBackgroundSlideshow } from "@/components/hero-background-slideshow";
import { BrandSticker } from "@/components/brand-sticker";

const combos = [
  { name: "Solo Riot", tag: "JUST YOU & YOUR CRAVING", desc: "A signature burger, seasoned fries and a chilled drink. Your lunch break just got a promotion.", image: sectionImages.comboBurgerSolo, tone: "green", links: [{ label: "Burgers", href: "/menu?category=Burgers" }] },
  { name: "Double Trouble", tag: "DOUBLE THE GOOD STUFF", desc: "Two stacked favourites, crispy sides and enough sauce to make a proper occasion of it.", image: sectionImages.comboBurgerDouble, tone: "cream", links: [{ label: "Burgers", href: "/menu?category=Burgers" }] },
  { name: "Wing Party", tag: "FOR THE SAUCE PEOPLE", desc: "Crispy wings tossed in your pick of heat, with fries and cool drinks to keep the party going.", image: sectionImages.comboChicken1, tone: "lime", links: [{ label: "Chicken & Wings", href: "/menu?category=Chicken%20%26%20Wings" }] },
  { name: "Pizza Night", tag: "SLICE, PASS, REPEAT", desc: "A hot, generous pizza with sides for the table. Pass the slices and keep the stories coming.", image: sectionImages.comboPizza, tone: "dark", links: [{ label: "Pizza", href: "/menu?category=Pizza" }] },
  { name: "Big Table", tag: "BRING YOUR PEOPLE", desc: "A generous mix of crowd favourites for sharing. Built for game nights, catch-ups and long lunches.", image: sectionImages.comboSharing, tone: "cream", links: [{ label: "Burgers", href: "/menu?category=Burgers" }, { label: "Chicken & Wings", href: "/menu?category=Chicken%20%26%20Wings" }, { label: "Sides & Starters", href: "/menu?category=Sides%20%26%20Starters" }] },
  { name: "Family Feast", tag: "EVERYONE GETS A PICK", desc: "A little something for every appetite, with enough variety to keep the whole table happy.", image: "/images/sections/burgers/burger-and-chicken-sharing-platter.jpg", tone: "green", links: [{ label: "Burgers", href: "/menu?category=Burgers" }, { label: "Chicken & Wings", href: "/menu?category=Chicken%20%26%20Wings" }, { label: "Sides & Starters", href: "/menu?category=Sides%20%26%20Starters" }] },
  { name: "Burger & Shake", tag: "THE CLASSIC DOUBLE ACT", desc: "A juicy burger and a thick, cold shake. Sometimes the best pairings need no explanation.", image: sectionImages.milkshakesCategory, tone: "lime", links: [{ label: "Burgers", href: "/menu?category=Burgers" }, { label: "Milkshakes", href: "/menu?category=Milkshakes" }] },
  { name: "Ultimate Sharing Box", tag: "MAKE A MOMENT OF IT", desc: "A table-ready spread of crunchy, saucy, cheesy favourites. Bring friends. Bring an appetite.", image: sectionImages.comboChicken2, tone: "dark", links: [{ label: "Chicken & Wings", href: "/menu?category=Chicken%20%26%20Wings" }, { label: "Sides & Starters", href: "/menu?category=Sides%20%26%20Starters" }] },
];

export default function Page() {
  return <main className="combo-page br-combo-page">
    <section className="combo-hero br-combo-hero">
      <HeroBackgroundSlideshow images={[sectionImages.comboBurgerSolo, sectionImages.comboChicken1, sectionImages.comboPizza, sectionImages.storySharing]} label="Combo food photography" interval={2300} />
      <div className="wrap br-combo-hero-content">
        <div className="eyebrow">THE COMBO CLUB / GOOD THINGS COME IN GROUPS</div>
        <h1 className="display">MAKE IT A<br /><em>WHOLE THING.</em></h1>
        <p>One bite is good. A table full of favourites? That’s a proper plan. Find your kind of hungry and make a meal of it.</p>
        <div className="combo-hero-bottom"><Link className="btn" href="#combo-lineup">Find your combo ↘</Link><span>SOLO PLANS / GROUP PLANS / BIG PLANS</span></div>
      </div>
      <BrandSticker kind="fries" label="BITE RIOT fries character" className="br-combo-sticker" />
    </section>

    <section className="section combo-intro"><div className="wrap combo-intro-grid">
      <Reveal><div className="eyebrow">01 / THE ART OF A GOOD COMBO</div><h2 className="display">MORE FOOD.<br /><em>MORE STORIES.</em></h2></Reveal>
      <Reveal delay={120}><p>We put the good things together so you can spend less time deciding and more time enjoying. Go solo, feed the group or build a table worth gathering around.</p><small>Explore the menu categories below to choose the dishes, prices and availability that are right for your table.</small><div className="br-combo-intro-detail"><span>GOOD FOOD, BETTER TOGETHER</span><b>ONE TABLE. MANY GOOD DECISIONS.</b></div></Reveal>
      <div className="br-combo-intro-photo"><img src={sectionImages.storySharing} alt="A generous BITE RIOT meal ready to share" loading="lazy" /><span>MADE FOR THE MIDDLE OF THE TABLE ✳</span></div>
    </div></section>

    <section className="section combo-lineup" id="combo-lineup"><div className="wrap">
      <Reveal className="section-head"><div><div className="eyebrow">02 / PICK YOUR KIND OF HUNGRY</div><h2 className="display">THE COMBO<br /><em>LINEUP.</em></h2></div><p>Eight familiar ways to start planning a good meal. Follow the links to explore the actual menu categories.</p></Reveal>
      <div className="combo-grid br-combo-grid">{combos.map((combo, index) => <Reveal key={combo.name} delay={(index % 4) * 65} className={`combo-card ${combo.tone} br-combo-card`}>
        <div className="combo-card-image"><img src={combo.image} alt={combo.name} loading="lazy" /><span>0{index + 1}</span></div>
        <div className="combo-card-copy"><small>{combo.tag}</small><h3>{combo.name}</h3><p>{combo.desc}</p>
          <div className="br-combo-categories"><span>EXPLORE THE MENU</span><div>{combo.links.map((link) => <Link key={link.label} href={link.href}>{link.label} ↗</Link>)}</div></div>
        </div>
      </Reveal>)}</div>
      <p className="combo-disclaimer">These are combo inspirations, not fixed-price bundles. Current dishes, prices and availability are shown in the menu.</p>
    </div></section>

    <section className="build-combo br-build-combo"><div className="wrap build-combo-grid">
      <div><div className="eyebrow">03 / YOUR TABLE, YOUR RULES</div><h2 className="display">BUILD YOUR<br /><em>OWN RIOT.</em></h2><p>Got a very specific craving? Start with the menu, choose your favourites and build a spread that feels like yours.</p><Link className="btn" href="/menu">Start with the menu ↗</Link></div>
      <div className="br-build-visuals br-build-pyramid">
        <div><img src={sectionImages.buildBurger} alt="Burger ingredients arranged on a table" loading="lazy" /><span>01</span><b>Pick your main</b><small>Burgers, pizza, wings or wraps.</small></div>
        <div><img src={sectionImages.buildSides} alt="Sides and starters" loading="lazy" /><span>02</span><b>Choose your sidekick</b><small>Fries, bites, dips and more.</small></div>
        <div><img src={sectionImages.buildDrinks} alt="Drinks to go with your meal" loading="lazy" /><span>03</span><b>Find your sip</b><small>Something cold, thick or fizzy.</small></div>
      </div>
    </div></section>
    <section className="br-combo-contact"><div className="wrap"><div><span>NEED A HAND PLANNING YOUR TABLE?</span><h2>LET'S TALK<br/><em>GOOD FOOD.</em></h2><p>Message the BITE RIOT team on WhatsApp for combo questions and group-order help.</p></div><a className="btn" href="https://wa.me/23491379230242" target="_blank" rel="noreferrer">WhatsApp us · 09137902342 ↗</a></div></section>
  </main>;
}
