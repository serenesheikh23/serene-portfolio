"use client";

import { useEffect, useRef, useState } from "react";
import { sectionLinks } from "@/lib/content";

export default function SectionProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("work");

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      barRef.current?.style.setProperty("--progress", String(progress));

      const marker = window.innerHeight * 0.4;
      let current = "work";

      for (const section of sectionLinks) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= marker) {
          current = section.id;
        }
      }

      setActive((previous) => (previous === current ? previous : current));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div ref={barRef} className="scroll-progress__bar" />
      </div>

      <nav className="progress-rail" aria-label="Section progress">
        {sectionLinks.map((section) => (
          <a
            key={section.id}
            className="progress-rail__link"
            href={`#${section.id}`}
            aria-current={active === section.id ? "true" : undefined}
            aria-label={`${section.num} ${section.label}`}
          >
            {section.num}
            <span className="progress-rail__label">{section.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
