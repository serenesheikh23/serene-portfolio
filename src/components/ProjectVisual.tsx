import type { ProjectVisual as Visual } from "@/lib/content";

const labels: Record<Visual, string> = {
  marketly: "Marketly interface study: an operations dashboard with three payment gateways and 86 API routes.",
  ismail: "Ismail Cosmetics interface study: a bilingual storefront with a 38-page React SPA.",
  codecraft: "Code Craft interface study: an agency site with a 36-page CMS and a fast hero.",
  madfox: "drama.gov.sy interface study: an Arabic CMS dashboard with content sections and roles.",
  light: "Light Promo interface study: a promotional site built from concept to launch.",
};

export default function ProjectVisual({ variant }: { variant: Visual }) {
  return (
    <div className={`pv pv--${variant}`} role="img" aria-label={labels[variant]}>
      <div className="pv__bar" aria-hidden="true">
        <span className="pv__mark" />
        <span className="pv__url">View live site ↗</span>
      </div>

      <div className="pv__body" aria-hidden="true">
        {variant === "marketly" && (
          <>
            <div className="pv__side">
              <span>Overview</span>
              <span>Orders</span>
              <span>Payments</span>
              <span>Partners</span>
            </div>
            <div className="pv__main">
              <div className="pv__titleline">Marketly / operations</div>
              <div className="pv__stats">
                <div className="pv__stat">
                  <b>3</b>
                  <span>gateways</span>
                </div>
                <div className="pv__stat">
                  <b>86</b>
                  <span>routes</span>
                </div>
                <div className="pv__stat">
                  <b>66</b>
                  <span>tests</span>
                </div>
              </div>
              <div className="pv__table">
                <div className="pv__table-row">
                  <span>Order lifecycle</span>
                  <span className="pv__pill">paid</span>
                </div>
                <div className="pv__table-row">
                  <span>Binance Pay</span>
                  <span>200</span>
                </div>
                <div className="pv__table-row">
                  <span>Duplicate event</span>
                  <span>ignored</span>
                </div>
              </div>
            </div>
          </>
        )}

        {variant === "ismail" && (
          <>
            <div className="pv__storehead">
              <b>Ismail Cosmetics</b>
              <span className="pv__locale">EN / AR</span>
            </div>
            <div className="pv__products">
              <div className="pv__product">
                <i />
                <span>Cleanser</span>
              </div>
              <div className="pv__product">
                <i />
                <span>Serum</span>
              </div>
              <div className="pv__product">
                <i />
                <span>Oil</span>
              </div>
            </div>
            <div className="pv__cart">
              <span>38-page SPA</span>
              <span>Cart · Wishlist</span>
            </div>
          </>
        )}

        {variant === "codecraft" && (
          <>
            <div className="pv__agencynav">
              <span>Code Craft</span>
              <span>Work / Services / About</span>
            </div>
            <div className="pv__agencyhero">
              <b>Agency site with a full CMS</b>
              <i />
            </div>
            <div className="pv__workgrid">
              <span />
              <span />
              <span />
            </div>
            <div className="pv__table-row">
              <span>36 pages</span>
              <span>56 API handlers</span>
            </div>
          </>
        )}

        {variant === "madfox" && (
          <>
            <div className="pv__side">
              <span>Content</span>
              <span>Sections</span>
              <span>Media</span>
              <span>Users</span>
            </div>
            <div className="pv__cmsmain">
              <div className="pv__titleline">drama.gov.sy / admin</div>
              <div className="pv__cmsrow">
                <b>Homepage</b>
                <span className="pv__status">Published</span>
              </div>
              <div className="pv__cmsrow">
                <b>Institution</b>
                <span className="pv__status">Published</span>
              </div>
              <div className="pv__cmsrow">
                <b>News</b>
                <span className="pv__status">Published</span>
              </div>
              <div className="pv__cmsrow">
                <b>Media library</b>
                <span>Edit</span>
              </div>
            </div>
          </>
        )}

        {variant === "light" && (
          <div className="pv__promo">
            <b>Light Promo</b>
            <span>Concept → live</span>
            <i />
            <span>Concept → live</span>
          </div>
        )}
      </div>

      <span className="pv__label">Interface study</span>
    </div>
  );
}
