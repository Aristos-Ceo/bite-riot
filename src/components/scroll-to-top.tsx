"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/** Always start a newly selected route at the top of the page. */
export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
