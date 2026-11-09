"use client";

import { useEffect, useState } from "react";

type Props = {
  images: string[];
  label?: string;
  interval?: number;
  activeIndex?: number;
};

export function HeroBackgroundSlideshow({
  images,
  label = "Featured food photography",
  interval = 2600,
  activeIndex,
}: Props) {
  const [internalActive, setInternalActive] = useState(0);
  const active = activeIndex ?? internalActive;

  useEffect(() => {
    images.forEach((src) => {
      const preload = new window.Image();
      preload.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (activeIndex !== undefined || images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setInternalActive((current) => (current + 1) % images.length),
      interval
    );
    return () => window.clearInterval(timer);
  }, [activeIndex, images.length, interval]);

  return (
    <div className="br-hero-slideshow" role="img" aria-label={label}>
      {images.map((image, index) => (
        <img
          key={`${image}-${index}`}
          className={`br-hero-slide ${index === active ? "is-active" : ""}`}
          src={image}
          alt=""
          aria-hidden="true"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
      <div className="br-hero-slideshow-shade" aria-hidden="true" />
    </div>
  );
}
