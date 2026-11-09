import type { Metadata } from "next";
import "./globals.css";
import "./bite-riot-image-upgrades.css";
import "./loader-mobile-polish.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartProvider } from "@/components/cart-provider";
import { ScrollMotion } from "@/components/scroll-motion";
import { ToastProvider } from "@/components/toast-provider";
import { SiteIntro } from "@/components/site-intro";

export const metadata:Metadata={title:"BITE RIOT — Good Food. Zero Quiet.",description:"A little attitude. A lot of flavour. Discover the BITE RIOT menu, combos and good-food energy."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><CartProvider><SiteIntro/><div className="topline">GOOD FOOD. ZERO QUIET. ✳ FRESHLY MADE. ALWAYS LOUD.</div><SiteHeader/><ToastProvider/><ScrollMotion/>{children}<SiteFooter/></CartProvider></body></html>}
