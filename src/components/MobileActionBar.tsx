"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

export default function MobileActionBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (y < 140) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="mobile-bar" data-hidden={hidden} aria-label="Quick actions">
      <div className="mobile-bar__inner">
        <a className="mobile-bar__link" href="#work">
          Work
        </a>
        <a className="mobile-bar__link" href="#contact">
          Contact
        </a>
        <a
          className="mobile-bar__link"
          href={site.cv}
          download={site.cvName}
          aria-label="Download Serene Sheikhalard's CV as a PDF"
        >
          Download CV
        </a>
      </div>
    </nav>
  );
}
