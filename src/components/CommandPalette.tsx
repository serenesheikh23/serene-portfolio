"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

type PaletteItem = {
  label: string;
  hint: string;
  href: string;
  download?: boolean;
};

const items: PaletteItem[] = [
  { label: "Selected work", hint: "01", href: "#work" },
  { label: "Case studies", hint: "02", href: "#case-studies" },
  { label: "Front-end craft", hint: "03", href: "#craft" },
  { label: "How I work", hint: "04", href: "#process" },
  { label: "Stack", hint: "05", href: "#stack" },
  { label: "About", hint: "06", href: "#about" },
  { label: "Contact", hint: "07", href: "#contact" },
  { label: "Download CV", hint: "PDF", href: site.cv, download: true },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const choose = (item: PaletteItem) => {
    close();

    if (item.download) {
      const anchor = document.createElement("a");
      anchor.href = site.cv;
      anchor.download = site.cvName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      return;
    }

    const target = document.getElementById(item.href.replace("#", ""));
    if (target) {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", item.href);
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) {
          close();
        } else {
          setOpen(true);
        }
      }

      if (event.key === "Escape" && open) {
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 20);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      trigger?.focus();
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => (filtered.length ? (current + 1) % filtered.length : 0));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) =>
        filtered.length ? (current - 1 + filtered.length) % filtered.length : 0,
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (filtered[active]) choose(filtered[active]);
    }
  };

  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>("input, button"),
    ).filter((element) => !element.hasAttribute("disabled"));

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <button
        className="command-trigger"
        type="button"
        ref={triggerRef}
        aria-label="Open command palette"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        ⌘K
      </button>

      {open && (
        <div
          className="palette"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            className="palette__dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            ref={dialogRef}
            onKeyDown={onDialogKeyDown}
          >
            <div className="palette__head">
              <span className="label">Jump to</span>
              <input
                className="palette__input"
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search work, craft, contact, CV…"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-autocomplete="list"
                aria-activedescendant={
                  filtered[active] ? `command-item-${active}` : undefined
                }
              />
            </div>

            <div className="palette__list" role="listbox" id="command-list">
              {filtered.length === 0 && (
                <p className="palette__empty">No matching destination.</p>
              )}

              {filtered.map((item, index) => (
                <div
                  className="palette__item"
                  role="option"
                  id={`command-item-${index}`}
                  aria-selected={index === active}
                  data-active={index === active}
                  key={`${item.label}-${item.href}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(item)}
                >
                  <span>{item.label}</span>
                  <span>{item.hint}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
