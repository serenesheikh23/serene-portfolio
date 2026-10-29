"use client";

import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

export default function CodeCraftBeforeAfter() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [position, setPosition] = useState(50);

  const updateFromClientX = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return;

    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, next)));
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current) {
      updateFromClientX(event.clientX);
    }
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setPosition((value) => Math.max(0, value - 2));
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setPosition((value) => Math.min(100, value + 2));
    }

    if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div>
      <div
        className="ba"
        ref={trackRef}
        style={{ "--pos": `${position}%` } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="ba__layer" aria-hidden="true">
          <div className="ba__mock ba__mock--after">
            <div className="ba__mockbar">
              <span>Code Craft</span>
              <span>LCP 2.4s</span>
            </div>
            <div className="ba__mockhero">
              <b>
                Agency site,
                <br />
                same layout, faster.
              </b>
              <i />
            </div>
            <div className="ba__mockrows">
              <span />
              <span />
              <span />
            </div>
            <div className="ba__score">
              <span>98 / 99 performance</span>
              <span>100 SEO</span>
              <span>97 a11y</span>
            </div>
          </div>
        </div>

        <div className="ba__layer ba__layer--before" aria-hidden="true">
          <div className="ba__mock ba__mock--before">
            <div className="ba__mockbar">
              <span>Code Craft</span>
              <span>LCP 5.3s</span>
            </div>
            <div className="ba__mockhero">
              <b>
                Agency site,
                <br />
                heavy first paint.
              </b>
              <i />
            </div>
            <div className="ba__mockrows">
              <span />
              <span />
              <span />
            </div>
            <div className="ba__score">
              <span>Unoptimized image payload</span>
            </div>
          </div>
        </div>

        <span className="ba__label">Before · 5.3s</span>
        <span className="ba__label ba__label--after">After · 2.4s</span>

        <div
          className="ba__handle"
          role="slider"
          tabIndex={0}
          aria-label="Compare Code Craft before and after the performance work"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)} percent before`}
          aria-describedby="codecraft-ba-note"
          onKeyDown={onKeyDown}
        >
          <span className="ba__knob" aria-hidden="true">
            ↔
          </span>
        </div>
      </div>

      <p className="ba__note" id="codecraft-ba-note">
        Drag the handle, tap anywhere on the image, or use the arrow keys. This
        is an illustrative reconstruction of the Code Craft performance work; no
        production screenshots are in the repo.
      </p>
    </div>
  );
}
