import type { SVGProps } from "react";

type StickerKind = "burger" | "chilli" | "fries";
type BrandStickerProps = { kind: StickerKind; label: string; className?: string };

/** Small original vector mascots drawn for the BITE RIOT visual identity. */
export function BrandSticker({ kind, label, className = "" }: BrandStickerProps) {
  const common: SVGProps<SVGSVGElement> = {
    viewBox: "0 0 180 180",
    role: "img",
    "aria-label": label,
    className: `br-brand-sticker-art ${className}`,
  };

  if (kind === "chilli") {
    return <svg {...common}>
      <path d="M128 28c-4 19-12 28-24 35 8 16 5 38-7 59-13 24-35 35-52 26-15-8-17-27-7-48 11-24 34-42 57-43 9-1 17 2 22 7 7-11 8-22 6-36Z" fill="#ef573f" stroke="#123c2d" strokeWidth="7" strokeLinejoin="round"/>
      <path d="M119 32c-4-10 2-18 14-22 5 10 2 19-8 27" fill="#8dbd39" stroke="#123c2d" strokeWidth="6" strokeLinecap="round"/>
      <path d="M67 91c5-5 10-5 15-1M93 92c4-4 9-4 13 0" fill="none" stroke="#123c2d" strokeWidth="5" strokeLinecap="round"/>
      <path d="M76 111c8 7 17 7 25 0" fill="none" stroke="#123c2d" strokeWidth="5" strokeLinecap="round"/>
      <path d="M41 116c-10 2-16 8-18 17M111 132c8 4 13 10 14 18" fill="none" stroke="#123c2d" strokeWidth="6" strokeLinecap="round"/>
      <path d="m30 54 5-9m-19 27 10-2m111 45 9 4" stroke="#b8e34a" strokeWidth="5" strokeLinecap="round"/>
    </svg>;
  }

  if (kind === "fries") {
    return <svg {...common}>
      <path d="m48 67 8-37c2-8 12-8 14 0l5 36 8-45c2-10 15-9 16 1l1 45 10-34c3-9 15-6 14 4l-3 39" fill="#f4bd43" stroke="#123c2d" strokeWidth="7" strokeLinejoin="round"/>
      <path d="m37 69 108-2-14 85c-2 10-10 16-20 16H69c-10 0-18-6-20-16L37 69Z" fill="#ef573f" stroke="#123c2d" strokeWidth="7" strokeLinejoin="round"/>
      <path d="M72 105c5-5 10-5 15 0m18 0c5-5 10-5 15 0" fill="none" stroke="#123c2d" strokeWidth="5" strokeLinecap="round"/>
      <path d="M82 127c8 8 19 8 27 0" fill="none" stroke="#123c2d" strokeWidth="5" strokeLinecap="round"/>
      <path d="M32 101 19 92m129 11 13-9" stroke="#123c2d" strokeWidth="6" strokeLinecap="round"/>
    </svg>;
  }

  return <svg {...common}>
    <path d="M30 81c0-31 27-54 60-54s60 23 60 54H30Z" fill="#f2bd68" stroke="#123c2d" strokeWidth="7" strokeLinejoin="round"/>
    <path d="m54 49 5-7m22 1 4-8m23 13 5-7" stroke="#fff5d9" strokeWidth="5" strokeLinecap="round"/>
    <path d="M29 83h122l-8 17H37l-8-17Z" fill="#83b943" stroke="#123c2d" strokeWidth="6" strokeLinejoin="round"/>
    <path d="M36 101h108l-5 17H41l-5-17Z" fill="#70412b" stroke="#123c2d" strokeWidth="6" strokeLinejoin="round"/>
    <path d="M34 121h112c-2 18-16 30-34 30H68c-18 0-32-12-34-30Z" fill="#eebf78" stroke="#123c2d" strokeWidth="7" strokeLinejoin="round"/>
    <path d="M70 91c4-4 9-4 13 0m23 0c4-4 9-4 13 0" fill="none" stroke="#123c2d" strokeWidth="5" strokeLinecap="round"/>
    <path d="M84 108c8 7 16 7 24 0" fill="none" stroke="#123c2d" strokeWidth="5" strokeLinecap="round"/>
    <path d="M25 108 13 101m142 7 12-7" stroke="#123c2d" strokeWidth="6" strokeLinecap="round"/>
  </svg>;
}
