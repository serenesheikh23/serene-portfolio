"use client";

import { useEffect, useRef, useState } from "react";
import ProjectVisual from "@/components/ProjectVisual";
import { caseStudies } from "@/lib/content";

export default function CaseStudyGallery() {
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    const rail = railRef.current;
    if (!rail) return;

    const clamped = Math.max(0, Math.min(caseStudies.length - 1, next));
    const slide = rail.children[clamped] as HTMLElement | undefined;
    if (!slide) return;

    const railRect = rail.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const left = rail.scrollLeft + slideRect.left - railRect.left;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    rail.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
    setIndex(clamped);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let ticking = false;

    const update = () => {
      const railRect = rail.getBoundingClientRect();
      const marker = railRect.left + rail.clientWidth * 0.35;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;

      Array.from(rail.children).forEach((child, childIndex) => {
        const rect = (child as HTMLElement).getBoundingClientRect();
        const nextDistance = Math.abs(rect.left - marker);
        if (nextDistance < distance) {
          distance = nextDistance;
          closest = childIndex;
        }
      });

      setIndex((previous) => (previous === closest ? previous : closest));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <div className="gallery">
      <div
        className="gallery__rail no-scrollbar"
        ref={railRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Case studies"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {caseStudies.map((study, studyIndex) => (
          <article
            className="gallery__slide"
            key={study.id}
            aria-roledescription="slide"
            aria-label={`${studyIndex + 1} of ${caseStudies.length}: ${study.title}`}
          >
            <ProjectVisual variant={study.visual} />
            <div className="gallery__meta">
              <b>{study.title}</b>
              <span>
                {study.results[0].value} {study.results[0].label}
              </span>
            </div>
            <a className="text-link" href={`#${study.id}`}>
              Read case study <span className="text-link__arrow">↓</span>
            </a>
          </article>
        ))}
      </div>

      <div className="gallery__controls">
        <span className="gallery__counter" aria-live="polite">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(caseStudies.length).padStart(2, "0")}
        </span>

        <div className="gallery__dots" aria-label="Choose a case study">
          {caseStudies.map((study, studyIndex) => (
            <button
              className="gallery__dot"
              type="button"
              key={study.id}
              aria-label={`Show ${study.title}`}
              aria-current={index === studyIndex ? "true" : undefined}
              onClick={() => goTo(studyIndex)}
            />
          ))}
        </div>

        <div className="gallery__buttons">
          <button
            className="icon-btn"
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous case study"
          >
            ←
          </button>
          <button
            className="icon-btn"
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === caseStudies.length - 1}
            aria-label="Next case study"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
