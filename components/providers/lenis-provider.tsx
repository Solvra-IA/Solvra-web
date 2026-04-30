"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const HEADER_OFFSET = 88;

function scrollToHash(hash: string, lenis: Lenis | null | undefined) {
  if (!hash) return;
  const target = document.querySelector(hash);
  if (!(target instanceof HTMLElement) || !lenis) return;

  lenis.scrollTo(target, {
    offset: -HEADER_OFFSET,
    duration: 0.55,
  });
}

function LenisAnchors() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    const onHashChange = () => {
      scrollToHash(window.location.hash, lenis);
    };

    const onAnchorClick = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) return;

      const link = event.target.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const href = link.getAttribute("href");
      if (!href || !href.includes("#")) return;

      const isSamePageHash = href.startsWith("#");
      const isHomeHash = href.startsWith("/#");
      if (!isSamePageHash && !(isHomeHash && pathname === "/")) return;

      const hash = isSamePageHash ? href : href.slice(1);
      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      scrollToHash(hash, lenis);
      history.replaceState(null, "", hash);
    };

    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onAnchorClick);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onAnchorClick);
    };
  }, [lenis, pathname]);

  return null;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setIsTouch(touchQuery.matches);
      setReducedMotion(reducedMotionQuery.matches);
    };

    sync();
    touchQuery.addEventListener("change", sync);
    reducedMotionQuery.addEventListener("change", sync);

    return () => {
      touchQuery.removeEventListener("change", sync);
      reducedMotionQuery.removeEventListener("change", sync);
    };
  }, []);

  const lenisOptions = useMemo(() => {
    if (reducedMotion) {
      return {
        duration: 0,
        smoothWheel: false,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      };
    }

    if (isTouch) {
      return {
        duration: 0.5,
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      };
    }

    return {
      duration: 0.65,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    };
  }, [isTouch, reducedMotion]);

  return (
    <ReactLenis root options={lenisOptions}>
      <LenisAnchors />
      {children}
    </ReactLenis>
  );
}
