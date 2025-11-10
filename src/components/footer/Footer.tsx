import "./Footer.css";

const footerSections = [
  {
    title: "Marketplace",
    items: ["Categories", "Popular", "Pricing"],
  },
  {
    title: "Resources",
    items: ["Help Center", "Safety", "Guides"],
  },
  {
    title: "Company",
    items: ["About", "Careers", "Contact"],
  },
  {
    title: "Legal",
    items: ["Terms", "Privacy"],
  },
];

const socials = [
  { icon: "📘", label: "Facebook" },
  { icon: "🐦", label: "Twitter" },
  { icon: "📸", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          {footerSections.map((section) => (
            <div key={section.title} className="site-footer__column">
              <h4 className="site-footer__heading">{section.title}</h4>
              <ul className="site-footer__list">
                {section.items.map((item) => (
                  <li key={item} className="site-footer__item">
                    <button type="button" className="site-footer__link">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer__divider" aria-hidden="true" />

        <div className="site-footer__bottom">
          <div className="site-footer__controls">
            <button type="button" className="site-footer__language">
              EN ▼
            </button>
            <div className="site-footer__socials">
              {socials.map((social) => (
                <button key={social.label} type="button" className="site-footer__social" aria-label={social.label}>
                  {social.icon}
                </button>
              ))}
            </div>
          </div>
          <p className="site-footer__note">© {new Date().getFullYear()} Kmong. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};