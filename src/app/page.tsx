import dynamic from "next/dynamic";
import Image from "next/image";
import {
  caseStudies,
  craft,
  processSteps,
  site,
  stackGroups,
} from "@/lib/content";

const ProjectIndex = dynamic(() => import("@/components/ProjectIndex"));
const CaseStudyGallery = dynamic(() => import("@/components/CaseStudyGallery"));
const CodeCraftBeforeAfter = dynamic(
  () => import("@/components/CodeCraftBeforeAfter"),
);
const PaymentFlow = dynamic(() => import("@/components/PaymentFlow"));
const WebhookDemo = dynamic(() => import("@/components/WebhookDemo"));
const ResizeDemo = dynamic(() => import("@/components/ResizeDemo"));

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="shell">
          <div className="hero__topline">
            <span className="label">Portfolio / 2026</span>
            <span className="label">{site.location}</span>
          </div>

          <div className="hero__grid">
            <div>
              <h1 id="hero-title" className="hero__name">
                <span>Serene</span>
                <span>
                  <em>Sheikhalard</em>
                </span>
              </h1>

              <p className="hero__position">
                Software engineer who builds fast, accessible interfaces and the
                Laravel backends behind them.
              </p>

              <p className="hero__availability">{site.availability}</p>

              <div className="hero__actions">
                <a className="btn btn--primary" href="#work">
                  See selected work <span className="btn__arrow">↓</span>
                </a>
                <a
                  className="btn"
                  href="/Serene_Sheikhalard_Software_Engineer.pdf"
                 
                  aria-label="Download Serene Sheikhalard's CV as a PDF"
                 download="Serene_Sheikhalard_Software_Engineer.pdf">
                  Download CV <span className="btn__arrow">↓</span>
                </a>
                <a className="text-link" href="#contact">
                  Contact <span className="text-link__arrow">↗</span>
                </a>
              </div>
            </div>

            <aside className="hero__aside" aria-label="At a glance">
              <p className="label hero__aside-title">At a glance</p>
              <dl className="fact-list">
                <div className="fact">
                  <dt>Based</dt>
                  <dd>Irving, Texas</dd>
                </div>
                <div className="fact">
                  <dt>Open to</dt>
                  <dd>Entry-level software engineer roles, Dallas–Fort Worth</dd>
                </div>
                <div className="fact">
                  <dt>Education</dt>
                  <dd>BS Information Technology, graduated June 2026</dd>
                </div>
                <div className="fact">
                  <dt>Languages</dt>
                  <dd>Arabic (native) · English (native)</dd>
                </div>
                <div className="fact">
                  <dt>Latest</dt>
                  <dd>Marketly · Ismail Cosmetics · Code Craft</dd>
                </div>
              </dl>
              <a className="text-link hero__scroll" href="#work">
                Start with the work <span className="text-link__arrow">↓</span>
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section
        id="work"
        className="section section--rule"
        aria-labelledby="work-title"
      >
        <div className="shell">
          <header className="section-head">
            <div className="section-mark">
              <span>01</span>
              <span>Selected work</span>
            </div>
            <div>
              <h2 id="work-title" className="section-title">
                Work that has to hold up.
              </h2>
              <p className="section-intro">
                Five builds, each with a real interface, a real API, and a
                deployment behind it. Tap a row to open the short version.
              </p>
            </div>
          </header>

          <ProjectIndex />
        </div>
      </section>

      <section
        id="case-studies"
        className="section section--rule"
        aria-labelledby="case-studies-title"
      >
        <div className="shell">
          <header className="section-head">
            <div className="section-mark">
              <span>02</span>
              <span>Case studies</span>
            </div>
            <div>
              <h2 id="case-studies-title" className="section-title">
                The decisions behind the numbers.
              </h2>
              <p className="section-intro">
                Swipe the index, then read the longer note: the problem, what I
                chose, and what shipped.
              </p>
            </div>
          </header>

          <CaseStudyGallery />

          <div className="case-studies">
            {caseStudies.map((study) => (
              <article
                className="case-study"
                id={study.id}
                key={study.id}
                aria-labelledby={`${study.id}-title`}
              >
                <div className="case-study__grid">
                  <aside className="case-study__aside">
                    <span className="case-study__index">{study.index}</span>
                    <h3 className="case-study__title" id={`${study.id}-title`}>
                      {study.title}
                    </h3>
                    <p className="case-study__subtitle">{study.subtitle}</p>
                    <p className="case-study__role">
                      {study.role}
                      <br />
                      {study.period}
                    </p>
                    <div className="work-row__tags" aria-label="Stack">
                      {study.stack.map((item) => (
                        <span className="tag" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                    <a
                      className="text-link"
                      href={study.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View live <span className="text-link__arrow">↗</span>
                    </a>
                  </aside>

                  <div className="case-study__body">
                    <div className="case-study__block">
                      <h3>Problem</h3>
                      <p>{study.problem}</p>
                    </div>

                    <div className="case-study__block">
                      <h3>What I decided</h3>
                      <ul className="case-study__decisions">
                        {study.decisions.map((decision) => (
                          <li key={decision}>{decision}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="case-study__block">
                      <h3>Result</h3>
                      <div className="metric-grid">
                        {study.results.map((result) => (
                          <div className="metric" key={result.label}>
                            <b>{result.value}</b>
                            <span>{result.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {study.id === "marketly" && (
                      <div className="case-study__block">
                        <h3>The payment path</h3>
                        <p>
                          One order lifecycle, three gateways. Step through it
                          below, then send the same webhook twice.
                        </p>
                        <div className="case-study__demo">
                          <PaymentFlow />
                        </div>
                        <div className="case-study__demo">
                          <WebhookDemo />
                        </div>
                      </div>
                    )}

                    {study.id === "codecraft" && (
                      <div className="case-study__block">
                        <h3>The performance work</h3>
                        <p>
                          The layout did not change. The payload did. Drag the
                          handle to compare the mobile LCP story.
                        </p>
                        <div className="case-study__demo">
                          <CodeCraftBeforeAfter />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="craft" className="section section--rule" aria-labelledby="craft-title">
        <div className="shell">
          <header className="section-head">
            <div className="section-mark">
              <span>03</span>
              <span>Front-end craft</span>
            </div>
            <div>
              <h2 id="craft-title" className="section-title">
                The part I want to do every day.
              </h2>
              <p className="section-intro">
                Fast pages, usable interfaces, and layouts that survive a real
                phone. Each claim here has a number or a shipped page behind it.
              </p>
            </div>
          </header>

          <div className="craft-list">
            {craft.map((item, index) => (
              <div className="craft-item" key={item.id}>
                <span className="craft-item__num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="craft-item__main">
                  <h3>{item.title}</h3>
                  <p className="craft-item__proof">{item.proof}</p>
                  <p className="craft-item__proof-label">{item.proofLabel}</p>
                </div>
                <p className="craft-item__detail">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="craft-demo">
            <div className="craft-demo__head">
              <span className="label">Try the reflow</span>
              <h3>Drag the container edge.</h3>
              <p>
                The same layout, from a 360px phone to a wide panel. The cards
                move from one column to three at 512px.
              </p>
            </div>
            <ResizeDemo />
          </div>
        </div>
      </section>

      <section
        id="process"
        className="section process"
        aria-labelledby="process-title"
      >
        <div className="shell">
          <header className="section-head">
            <div className="section-mark">
              <span>04</span>
              <span>How I work</span>
            </div>
            <div>
              <h2 id="process-title" className="section-title">
                Boring pipelines. Serious tests.
              </h2>
              <p className="section-intro">
                The work after the feature: proving it, shipping it, and keeping
                it live.
              </p>
            </div>
          </header>

          <div className="process__grid">
            {processSteps.map((step) => (
              <div className="process-step" key={step.num}>
                <span className="process-step__num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>

          <div className="process__footer">
            <span>66 PHPUnit tests</span>
            <span>8 Vitest tests</span>
            <span>GitHub Actions</span>
            <span>Docker + Nginx</span>
          </div>
        </div>
      </section>

      <section id="stack" className="section section--rule" aria-labelledby="stack-title">
        <div className="shell">
          <header className="section-head">
            <div className="section-mark">
              <span>05</span>
              <span>Stack</span>
            </div>
            <div>
              <h2 id="stack-title" className="section-title">
                What I reach for.
              </h2>
              <p className="section-intro">
                Grouped by what I built with it, not a wall of logos.
              </p>
            </div>
          </header>

          <div className="stack-grid">
            {stackGroups.map((group) => (
              <div className="stack-group" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.note}</p>
                <ul className="tag-list">
                  {group.items.map((item) => (
                    <li className="tag" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section section--rule" aria-labelledby="about-title">
        <div className="shell">
          <header className="section-head">
            <div className="section-mark">
              <span>06</span>
              <span>About</span>
            </div>
            <div>
              <h2 id="about-title" className="section-title">
                I learned by shipping.
              </h2>
            </div>
          </header>

          <div className="about-grid">
            <figure>
              <div className="portrait">
                <Image
                  src="/serene-photo.jpg"
                  alt="Portrait of Serene Sheikhalard"
                  width={1320}
                  height={880}
                  sizes="(min-width: 900px) 40vw, 100vw"
                />
              </div>
              <figcaption className="portrait__caption">
                <span>Serene Sheikhalard</span>
                <span>Irving, Texas</span>
              </figcaption>
            </figure>

            <div className="about-copy">
              <p>
                I&apos;m Serene, a full-stack software engineer based in Irving,
                Texas. I earned a BS in Information Technology at the International University of Science and Technology in June 2026.
              </p>
              <p>
                I started shipping at Mad Fox, where I built a Laravel system end
                to end and delivered the all-Arabic institutional CMS behind
                drama.gov.sy. Since then I&apos;ve worked freelance on Marketly,
                Ismail Cosmetics, and Code Craft: three production applications,
                each with its own front end, API, and deployment.
              </p>
              <p>
                I&apos;m a native Arabic and English speaker. I like the part of
                the work where a design has to survive real data and a real phone in a user&apos;s hand. I&apos;m looking for an entry-level software engineer
                role in Dallas–Fort Worth where I can keep doing both the
                interface and the system behind it.
              </p>

              <dl className="credentials">
                <div className="credential">
                  <dt>Education</dt>
                  <dd>
                    BS Information Technology, International University of
                    Science and Technology, graduated June 2026
                  </dd>
                </div>
                <div className="credential">
                  <dt>Certification</dt>
                  <dd>
                    Master Full-Stack Web Development with Laravel and PHP,
                    Board Infinity / Coursera
                  </dd>
                </div>
                <div className="credential">
                  <dt>Languages</dt>
                  <dd>Arabic (native) · English (native)</dd>
                </div>
                <div className="credential">
                  <dt>Based</dt>
                  <dd>Irving, Texas</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact" aria-labelledby="contact-title">
        <div className="shell">
          <header className="section-head">
            <div className="section-mark">
              <span>07</span>
              <span>Contact</span>
            </div>
            <div>
              <h2 id="contact-title" className="section-title">
                Hiring for the interface or the system?
              </h2>
              <p className="section-intro">
                I&apos;m looking for an entry-level software engineer role in
                Dallas–Fort Worth. Graduated June 2026; available for entry-level software engineering roles now.
              </p>
            </div>
          </header>

          <div className="contact__grid">
            <div>
              <p className="label">Email</p>
              <a className="contact-email" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>

            <div className="contact__aside">
              <div className="contact-links">
                <a
                  className="contact-link"
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>LinkedIn</span>
                  <span>↗</span>
                </a>
                <a
                  className="contact-link"
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>GitHub</span>
                  <span>↗</span>
                </a>
                <a
                  className="contact-link"
                  href="/Serene_Sheikhalard_Software_Engineer.pdf"
                 
                  aria-label="Download Serene Sheikhalard's CV as a PDF"
                 download="Serene_Sheikhalard_Software_Engineer.pdf">
                  <span>Download CV</span>
                  <span>↓</span>
                </a>
              </div>

              <a
                className="btn btn--primary"
                href="/Serene_Sheikhalard_Software_Engineer.pdf"
               
                aria-label="Download Serene Sheikhalard's CV as a PDF"
               download="Serene_Sheikhalard_Software_Engineer.pdf">
                Download CV <span className="btn__arrow">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell site-footer__inner">
          <span>© {year} Serene Sheikhalard</span>
          <span>Irving, Texas · Dallas–Fort Worth</span>
          <span>Built with Next.js, TypeScript, and Tailwind</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
