"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    label: "Order",
    node: "Order created",
    sub: "one record",
    detail:
      "A customer places an order. The store creates one order record and starts one payment path.",
  },
  {
    label: "Interface",
    node: "PaymentGatewayInterface",
    sub: "one contract",
    detail:
      "The order talks to one interface, not to three providers. Every gateway implements the same contract.",
  },
  {
    label: "Gateway",
    node: "Binance Pay / USDT / Mobile wallet",
    sub: "3 gateways",
    detail:
      "The selected gateway handles the payment flow. The rest of the order lifecycle stays the same.",
  },
  {
    label: "Webhook",
    node: "Webhook received",
    sub: "callback",
    detail:
      "The provider calls back with the payment result. The handler runs the same order update path regardless of the gateway.",
  },
  {
    label: "Idempotent",
    node: "Update once",
    sub: "duplicate ignored",
    detail:
      "The same event can arrive twice. The handler records it and ignores the duplicate, so the order is paid once.",
  },
];

export default function PaymentFlow() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) {
            setActive(index);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(steps.length - 1, next));
    setActive(clamped);

    if (window.matchMedia("(min-width: 1024px)").matches) {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      stepRefs.current[clamped]?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "center",
      });
    }
  };

  return (
    <div className="flow">
      <div className="flow__sticky">
        <div className="flow__head">
          <div className="flow__steps" aria-label="Payment flow steps">
            {steps.map((step, index) => (
              <button
                className="flow__step-btn"
                type="button"
                key={step.label}
                aria-current={active === index ? "step" : undefined}
                aria-label={`Step ${index + 1}: ${step.label}`}
                onClick={() => goTo(index)}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
          <span className="flow__counter" aria-live="polite">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(steps.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flow__body">
          <div className="flow__diagram" aria-hidden="true">
            {steps.map((step, index) => (
              <div key={step.node}>
                <div className="flow__node" data-active={active === index}>
                  <span>{step.node}</span>
                  <span>{step.sub}</span>
                </div>
                {index < steps.length - 1 && <div className="flow__connector" />}
              </div>
            ))}
          </div>

          <div>
            <p className="label">Step {String(active + 1).padStart(2, "0")}</p>
            <p className="flow__caption" aria-live="polite">
              {steps[active].detail}
            </p>
          </div>
        </div>

        <div className="flow__controls">
          <button
            className="btn btn--small"
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
          >
            ← Back
          </button>
          <span className="label">Tap or scroll</span>
          <button
            className="btn btn--small btn--primary"
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === steps.length - 1}
          >
            Next →
          </button>
        </div>
      </div>

      <div className="flow__scrolly" aria-hidden="true">
        {steps.map((step, index) => (
          <div
            className="flow__scroll-step"
            key={step.label}
            data-index={index}
            ref={(element) => {
              stepRefs.current[index] = element;
            }}
          >
            <b>{step.label}</b>
            <span>{step.node}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
