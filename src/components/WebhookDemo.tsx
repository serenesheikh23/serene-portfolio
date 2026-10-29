"use client";

import { useState } from "react";

export default function WebhookDemo() {
  const [events, setEvents] = useState<string[]>([]);

  const send = () => {
    setEvents((current) =>
      current.length === 0
        ? ["event #1 · order paid"]
        : [...current, `event #${current.length + 1} · duplicate ignored`],
    );
  };

  const reset = () => setEvents([]);

  const status =
    events.length === 0
      ? "Waiting for a webhook."
      : events.length === 1
        ? "200 OK · order paid"
        : "200 OK · duplicate ignored";

  return (
    <div className="webhook">
      <div className="webhook__head">
        <span className="label">Webhook handler</span>
        <span className="webhook__badge">Simulation</span>
      </div>

      <p className="webhook__status" aria-live="polite">
        {status}
      </p>

      <div className="webhook__log" aria-label="Event log">
        {events.length === 0 ? (
          <span>No events yet.</span>
        ) : (
          events.map((event) => <span key={event}>{event}</span>)
        )}
      </div>

      <div className="webhook__actions">
        <button className="btn btn--small btn--primary" type="button" onClick={send}>
          Send the webhook
        </button>
        <button
          className="btn btn--small"
          type="button"
          onClick={reset}
          disabled={events.length === 0}
        >
          Reset
        </button>
      </div>

      <p className="label">
        Tap twice: the first event pays the order; the second is acknowledged and
        ignored.
      </p>
    </div>
  );
}
