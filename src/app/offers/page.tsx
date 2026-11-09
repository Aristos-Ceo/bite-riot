import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { sectionImages } from "@/lib/bite-riot-images";
import { HeroBackgroundSlideshow } from "@/components/hero-background-slideshow";
import { BrandSticker } from "@/components/brand-sticker";

const campaigns = [
  {number:"01",tag:"THE GROUP CHAT MADE IT",title:"SHARE THE GOOD STUFF.",copy:"Bring your people, pick a spread and turn an ordinary catch-up into a proper table moment.",image:sectionImages.offersChicken,href:"/combos",cta:"Explore combos",tone:"dark",detail:"FOR THE GROUP CHAT · COMBOS & SHARE PLATES"},
  {number:"02",tag:"YOUR NEXT FAVOURITE",title:"TRY A NEW CRAVING.",copy:"A new favourite might be one scroll away. Explore the full lineup and follow your appetite.",image:sectionImages.offersDesserts,href:"/menu",cta:"Find your bite",tone:"lime",detail:"FOR THE CURIOUS · EXPLORE THE FULL MENU"},
  {number:"03",tag:"SOMETHING COLD WITH THAT?",title:"MAKE IT A LITTLE EXTRA.",copy:"Add a refreshing drink or a sweet finish to round out the meal.",image:sectionImages.offersDrinks,href:"/menu?category=Drinks",cta:"Find your sip",tone:"cream",detail:"FOR THE FINISH · DRINKS & SWEET THINGS"},
];
export default function Page(){return <main className="br-offers-page">
  <section className="br-offers-hero"><HeroBackgroundSlideshow images={[sectionImages.offersChicken,sectionImages.offersDesserts,sectionImages.offersDrinks,sectionImages.comboBurgerSolo]} label="BITE RIOT offers photography" interval={2300}/><div className="wrap"><div className="eyebrow">GOOD THINGS COME WITH GOOD TIMING</div><h1 className="display">OFFERS WITH<br/><em>NO SURPRISES.</em></h1><p>More reasons to get together, share a few sides and make room for one more bite.</p><span className="br-offers-stamp">GOOD FOOD<br/>GOOD COMPANY<br/>ZERO QUIET ✳</span><BrandSticker kind="chilli" label="BITE RIOT chilli character" className="br-offers-sticker" /></div></section>
  <section className="section br-offers-content"><div className="wrap"><Reveal className="br-offers-heading"><div><div className="eyebrow">01 / A LITTLE SOMETHING EXTRA</div><h2 className="display">GOOD THINGS<br/><em>ARE ON THE TABLE.</em></h2></div><p>Discover a new favourite, make it a group moment or add a little something to your order.</p></Reveal>
    <div className="br-offers-grid">{campaigns.map((c)=><Reveal key={c.number} className={`br-offer-card ${c.tone}`}><div className="br-offer-image"><img src={c.image} alt="" loading="lazy"/><span>{c.number}</span></div><div className="br-offer-copy"><small>{c.tag}</small><h3>{c.title}</h3><p>{c.copy}</p><div className="br-offer-meta">{c.detail}</div><Link className="btn" href={c.href}>{c.cta} ↗</Link></div></Reveal>)}</div>
    <div className="br-offers-note"><span>✳</span><div><b>NO MADE-UP DEALS. JUST GOOD FOOD.</b><p>Any live discounts, coupon codes, eligibility rules and campaign dates will appear here once configured in the admin. We never advertise savings that have not been confirmed.</p></div></div>
  </div></section>
</main>}
