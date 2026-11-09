import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { sectionImages } from "@/lib/bite-riot-images";
import { HeroBackgroundSlideshow } from "@/components/hero-background-slideshow";
import { BrandSticker } from "@/components/brand-sticker";

const gallery = [
  { name: "The main event", tag: "STACKED WITH INTENT", img: sectionImages.storyBurger, size: "large" },
  { name: "Crispy business", tag: "CRUNCH FIRST", img: sectionImages.storyChicken },
  { name: "A slice of loud", tag: "FRESH FROM THE OVEN", img: sectionImages.storyPizza },
  { name: "Sauce on everything", tag: "SIDE QUEST", img: sectionImages.storySides },
  { name: "Something sweet", tag: "SAVE A LITTLE ROOM", img: sectionImages.storyShake, size: "tall" },
  { name: "Made for sharing", tag: "PASS THE PLATE", img: sectionImages.storySharing },
  { name: "Cold, bright, fizzy", tag: "SIP SOMETHING GOOD", img: sectionImages.homeDrinks },
  { name: "One more bite", tag: "NO BORING BITES", img: sectionImages.homeDesserts },
];

export default function Page() {
  return <main className="story-page br-story-page">
    <section className="story-hero">
      <HeroBackgroundSlideshow images={[sectionImages.storyBurger, sectionImages.storyChicken, sectionImages.storyPizza, sectionImages.storySharing]} label="BITE RIOT story photography" interval={2300} />
      <div className="wrap story-hero-content">
        <div className="eyebrow">THE BITE RIOT POINT OF VIEW / EST. IN GOOD TASTE</div>
        <h1 className="display">A LITTLE<br />ATTITUDE.<br /><em>A LOT OF<br />FLAVOUR.</em></h1>
        <p>Not just something to eat. Something to gather around, get messy with and remember long after the last bite.</p>
        <a className="btn" href="#manifesto">Get to know us ↓</a>
        <span className="story-hero-index">01 — THE MANIFESTO</span>
      </div>
      <div className="story-side-note">GOOD FOOD<br />BRINGS THE<br />NOISE ✳</div>
    </section>

    <section className="manifesto br-manifesto" id="manifesto">
      <div className="wrap manifesto-grid">
        <Reveal className="br-manifesto-heading">
          <div className="eyebrow">A LITTLE ATTITUDE. A LOT OF FLAVOUR.</div>
          <h2 className="display">FOOD WITH<br /><em>SOMETHING<br />TO SAY.</em></h2>
          <BrandSticker kind="chilli" label="BITE RIOT chilli character" className="br-manifesto-sticker" />
        </Reveal>
        <div className="br-manifesto-side">
          <Reveal delay={130} className="br-manifesto-copy">
            <p className="manifesto-lead">We believe the best moments happen around good food.</p>
            <p>The table gets louder, the stories get better, and nobody leaves counting bites. BITE RIOT is a celebration of flavour, good company and doing things your own way.</p>
            <p>We’re here for the extra napkin, the last crispy fry and the ‘you have to try this’ moment. Familiar favourites get a little more personality. Every craving gets a seat at the table.</p>
            <Link className="text-link" href="/menu">Find your favourite <span>↗</span></Link>
          </Reveal>
          <div className="br-manifesto-image">
            <img src={sectionImages.storySharing} alt="Friends sharing a BITE RIOT meal around the table" loading="lazy" />
            <span>GOOD FOOD IS BETTER SHARED ✳</span>
          </div>
        </div>
      </div>
    </section>

    <section className="story-gallery br-story-gallery" id="gallery">
      <div className="wrap">
        <Reveal className="story-gallery-head">
          <div><div className="eyebrow">A VISUAL FEAST / 02</div><h2 className="display">THE GOOD STUFF<br /><em>LOOKS LIKE THIS.</em></h2></div>
          <p>Big plates. Little details. Colour, crunch and all the in-between moments.</p>
        </Reveal>
        <div className="editorial-gallery">
          {gallery.map((item, index) => <Reveal key={item.name} delay={(index % 4) * 65} className={`editorial-shot ${item.size || ""}`}>
            <div className="editorial-shot-img"><img src={item.img} alt={item.name} loading="lazy" /><span className="shot-number">{String(index + 1).padStart(2, "0")}</span></div>
            <div className="shot-caption"><b>{item.name}</b><span>{item.tag}</span></div>
          </Reveal>)}
        </div>
        <div className="gallery-footnote">A FEW OF OUR FAVOURITE THINGS. MORE GOODNESS ON THE MENU ↗</div>
      </div>
    </section>

    <section className="story-values br-story-values">
      <div className="wrap values-layout">
        <div className="br-values-intro">
          <div className="eyebrow">03 / WHAT WE BELIEVE</div>
          <h2 className="display">NO BORING<br /><em>BITES.</em></h2>
          <p>Three things sit at the heart of every plate, every gathering and every BITE RIOT moment.</p>
          <img src={sectionImages.storySharing} alt="Friends sharing a BITE RIOT meal" loading="lazy" />
        </div>
        <div className="value-list">
          <article className="br-value-one"><span>01</span><div><small>THE NON-NEGOTIABLE</small><h3>Flavour comes first.</h3><p>Bold combinations, familiar favourites and a little surprise in every corner of the menu.</p></div><b className="br-value-mark">✳</b></article>
          <article className="br-value-two"><span>02</span><div><small>BETTER TOGETHER</small><h3>Good food is a team sport.</h3><p>Meals are better when they’re shared, passed around and talked over.</p></div><b className="br-value-mark">↗</b></article>
          <article className="br-value-three"><span>03</span><div><small>MAKE IT YOURS</small><h3>Bring your whole appetite.</h3><p>No rules about the perfect order. Follow the craving and make it yours.</p></div><b className="br-value-mark">✳</b></article>
        </div>
      </div>
    </section>

    <section className="story-closer"><div className="wrap"><div className="eyebrow">YOUR TABLE IS WAITING</div><h2 className="display">COME HUNGRY.<br /><em>LEAVE LOUD.</em></h2><Link className="btn" href="/menu">Explore the menu ↗</Link></div></section>
  </main>;
}

