"use client";

import { useState } from "react";
import ProjectVisual from "@/components/ProjectVisual";
import { projects } from "@/lib/content";

export default function ProjectIndex() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="work-index">
      {projects.map((project) => {
        const isOpen = open === project.slug;
        const panelId = `project-panel-${project.slug}`;

        return (
          <article className="work-row" key={project.slug}>
            <button
              className="work-row__button"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : project.slug)}
            >
              <span className="work-row__num">{project.index}</span>
              <span>
                <span className="work-row__title">{project.title}</span>
                <span className="work-row__sub">{project.subtitle}</span>
              </span>
              <span className="work-row__meta">{project.metric}</span>
              <span className="work-row__toggle" aria-hidden="true">
                +
              </span>
            </button>

            <div
              className="work-row__panel"
              id={panelId}
              data-open={isOpen}
              inert={!isOpen}
            >
              <div>
                <div className="work-row__inner">
                  <div className="work-row__copy">
                    <p className="label">{project.metric}</p>
                    <p>{project.summary}</p>
                    <div className="work-row__tags" aria-label="Stack">
                      {project.stack.map((item) => (
                        <span className="tag" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="work-row__actions">
                      <a
                        className="btn btn--small btn--primary"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View live <span className="btn__arrow">↗</span>
                      </a>
                      {project.caseStudyId && (
                        <a className="btn btn--small" href={`#${project.caseStudyId}`}>
                          Case study <span className="btn__arrow">↓</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <ProjectVisual variant={project.visual} />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
