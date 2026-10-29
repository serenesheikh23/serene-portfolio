"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

const presets = [
  { label: "360", value: 360 },
  { label: "512", value: 512 },
  { label: "Full", value: 10000 },
];

export default function ResizeDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startWidth: 320 });
  const [width, setWidth] = useState(320);
  const [maxWidth, setMaxWidth] = useState(600);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      const nextMax = Math.max(260, Math.floor(stage.clientWidth));
      setMaxWidth(nextMax);
      setWidth((current) => Math.min(current, nextMax));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  const clamp = (value: number) => {
    const minimum = Math.min(260, maxWidth);
    return Math.max(minimum, Math.min(maxWidth, value));
  };

  const setPreset = (value: number) => {
    setWidth(clamp(Math.min(value, maxWidth)));
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    drag.current = {
      active: true,
      startX: event.clientX,
      startWidth: width,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    setWidth(clamp(drag.current.startWidth + delta));
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    drag.current.active = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setWidth((value) => clamp(value - 24));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setWidth((value) => clamp(value + 24));
    }

    if (event.key === "Home") {
      event.preventDefault();
      setWidth(clamp(260));
    }

    if (event.key === "End") {
      event.preventDefault();
      setWidth(maxWidth);
    }
  };

  return (
    <div className="resize">
      <div className="resize__top">
        <span className="label">Drag the edge</span>
        <div className="resize__presets" aria-label="Container width presets">
          {presets.map((preset) => {
            const target = Math.round(Math.min(preset.value, maxWidth));
            return (
              <button
                className="resize__preset"
                type="button"
                key={preset.label}
                aria-pressed={Math.round(width) === target}
                onClick={() => setPreset(preset.value)}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="resize__stage" ref={stageRef}>
        <div
          className="resize__frame"
          style={{ "--w": `${width}px` } as CSSProperties}
        >
          <div className="resize__ui" aria-hidden="true">
            <div className="resize__ui-head">
              <span>S. Sheikhalard</span>
              <span>Work / About / CV</span>
            </div>
            <div className="resize__ui-hero">
              <b>A layout that reflows.</b>
              <i />
            </div>
            <div className="resize__ui-cards">
              <div className="resize__ui-card">Performance</div>
              <div className="resize__ui-card">Accessibility</div>
              <div className="resize__ui-card">Responsive</div>
            </div>
          </div>

          <div
            className="resize__handle"
            role="slider"
            tabIndex={0}
            aria-label="Resize the demo container"
            aria-valuemin={Math.min(260, maxWidth)}
            aria-valuemax={Math.round(maxWidth)}
            aria-valuenow={Math.round(width)}
            aria-valuetext={`${Math.round(width)} pixels wide`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onKeyDown={onKeyDown}
          >
            <span aria-hidden="true">↔</span>
          </div>
        </div>
      </div>

      <p className="resize__readout" aria-live="polite">
        Container: {Math.round(width)}px · reflow at 512px · max {maxWidth}px
      </p>
    </div>
  );
}
