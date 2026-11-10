import { useLang } from './i18n.jsx';

export function Navbar() {
  const { t, toggleLang } = useLang();
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <a href="#home" className="logo">{t.footer.brand}</a>
        <ul className="nav-links">
          <li><a href="#home">{t.nav.home}</a></li>
          <li><a href="#about">{t.nav.about}</a></li>
          <li><a href="#expertise">{t.nav.expertise}</a></li>
          <li><a href="#platforms">{t.nav.platforms}</a></li>
          <li><a href="#articles">{t.nav.articles}</a></li>
          <li><a href="#contact">{t.nav.contact}</a></li>
          <li><a href="#/freelance">{t.nav.platforms === 'Platforms' ? 'Freelance' : 'الأعمال والحلول'}</a></li>
          <li><a href="#/family">صلة</a></li>
          <li><a href="#/client">{t.nav.platforms === 'Platforms' ? 'Client Portal' : 'لوحة العميل'}</a></li>
        </ul>
        <div className="nav-actions">
          <a href="#platforms" className="btn primary nav-cta">{t.nav.cta}</a>
          <button className="lang-btn" onClick={toggleLang}>{t.switchTo}</button>
        </div>
      </div>
    </nav>
  );
}

export function Hero() {
  const { t } = useLang();
  return (
    <header id="home" className="hero">
      <div className="container">
        <h1>{t.hero.title}</h1>
        <p className="tagline">{t.hero.text}</p>
        <div className="cta-row">
          <a href="#about" className="btn primary">{t.hero.aboutBtn}</a>
          <a href="#platforms" className="btn outline">{t.hero.platformsBtn}</a>
        </div>
        <p className="hero-tagline">{t.hero.tagline}</p>
      </div>
    </header>
  );
}

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">{t.about.title}</h2>
        <p>{t.about.p1}</p>
        <p>{t.about.p2}</p>
        <div className="cta-row start">
          <a href="#expertise" className="btn outline">{t.about.moreBtn}</a>
        </div>
      </div>
    </section>
  );
}

export function Expertise() {
  const { t } = useLang();
  return (
    <section id="expertise" className="section alt">
      <div className="container">
        <h2 className="section-title">{t.expertise.title}</h2>
        <div className="cards-grid">
          {t.expertise.items.map((s) => (
            <div className="card" key={s.name}>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Platforms() {
  const { t } = useLang();
  return (
    <section id="platforms" className="section">
      <div className="container">
        <h2 className="section-title">{t.platforms.title}</h2>
        <p className="section-subtitle">{t.platforms.intro}</p>
        <div className="cards-grid">
          <div className="card">
            <h3>{t.platforms.personal.title}</h3>
            <p>{t.platforms.personal.desc}</p>
            <a href="#home" className="btn outline small">{t.platforms.personal.btn}</a>
          </div>
          <div className="card">
            <h3>{t.platforms.freelance.title}</h3>
            <p>{t.platforms.freelance.desc}</p>
            <a href="#/freelance" className="btn outline small">{t.platforms.freelance.btn}</a>
          </div>
          <div className="card">
            <h3>{t.platforms.family.title}</h3>
            <p>{t.platforms.family.desc}</p>
            <a href="#/family" className="btn outline small">{t.platforms.family.btn}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Methodology() {
  const { t } = useLang();
  return (
    <section className="section alt">
      <div className="container">
        <h2 className="section-title">{t.methodology.title}</h2>
        <div className="steps-grid">
          {t.methodology.steps.map((s, i) => (
            <div className="step" key={s.name}>
              <span className="num">{i + 1}</span>
              <h4>{s.name}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Values() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{t.values.title}</h2>
        <div className="cards-grid">
          {t.values.items.map((v) => (
            <div className="card" key={v.name}>
              <h3>{v.name}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Articles() {
  const { t } = useLang();
  return (
    <section id="articles" className="section alt">
      <div className="container">
        <h2 className="section-title">{t.articles.title}</h2>
        <p className="section-subtitle">{t.articles.subtitle}</p>
        <div className="cards-grid">
          {t.articles.items.map((a) => (
            <div className="card" key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
        <div className="cta-row start">
          <a href="#articles" className="btn outline">{t.articles.allBtn}</a>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">{t.contact.title}</h2>
        <p className="section-subtitle">{t.contact.text}</p>
        <div className="cta-row start">
          <a href="#/freelance" className="btn primary">{t.contact.startBtn}</a>
          <a href="https://wa.me/" target="_blank" rel="noopener" className="btn outline">{t.contact.whatsappBtn}</a>
        </div>
      </div>
    </section>
  );
}

export function LegalPage({ page }) {
  const { t } = useLang();
  const content = t.legalPages[page];
  return (
    <main className="page">
      <div className="container login-wrap">
        <h1 className="section-title">{content.title}</h1>
        <div className="card">
          <p>{content.body}</p>
        </div>
        <div className="cta-row start">
          <a href="#/" className="btn outline">←</a>
        </div>
      </div>
    </main>
  );
}

export function Footer() {
  const { t } = useLang();
  const quickHrefs = ['#about', '#expertise', '#/freelance', '#articles', '#contact'];
  const platformHrefs = ['#/freelance', '#/family', '#/freelance', '#/client'];
  const legalKeys = ['privacy', 'terms', 'disclaimer', 'cookies'];
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 className="footer-brand">{t.footer.brand}</h3>
          <p>{t.footer.brandDesc}</p>
          <p className="footer-tagline">{t.hero.tagline}</p>
        </div>
        <div>
          <h4>{t.footer.quickTitle}</h4>
          <ul>
            {t.footer.quick.map((q, i) => (
              <li key={q}><a href={quickHrefs[i]}>{q}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{t.footer.platformsTitle}</h4>
          <ul>
            {t.footer.platformsLinks.map((p, i) => (
              <li key={p}><a href={platformHrefs[i]}>{p}</a></li>
            ))}
            <li><a href="#/client">{t.nav.platforms === 'Platforms' ? 'Client Portal' : 'لوحة العميل'}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t.footer.legalTitle}</h4>
          <ul>
            {legalKeys.map((k) => (
              <li key={k}><a href={`#/${k}`}>{t.footer.legal[k]}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-copy">{t.footer.copyright}</div>
    </footer>
  );
}
