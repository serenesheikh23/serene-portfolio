import CommandPalette from "@/components/CommandPalette";
import { navItems, site } from "@/lib/content";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a className="wordmark" href="#main" aria-label="Serene Sheikhalard, back to top">
          Serene Sheikhalard<span>.</span>
        </a>

        <div className="site-header__right">
          <nav className="nav-links" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item.href} className="nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <CommandPalette />

          <a
            className="header-cv"
            href="/Serene_Sheikhalard_Software_Engineer.pdf"
           
            aria-label="Download Serene Sheikhalard's CV as a PDF"
           download="Serene_Sheikhalard_Software_Engineer.pdf">
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
