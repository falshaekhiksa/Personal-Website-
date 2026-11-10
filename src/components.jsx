import { useState, useEffect, useRef, useMemo } from 'react';
import { useLang } from './i18n.jsx';
import heroImg from './assets/hero.png';

const SOCIAL_LINKS = [
  { key: 'github', href: 'https://github.com/yourname', icon: '🐙' },
  { key: 'linkedin', href: 'https://linkedin.com/in/yourname', icon: '💼' },
  { key: 'twitter', href: 'https://twitter.com/yourname', icon: '🐦' },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export function Reveal({ children, className = '' }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function Navbar() {
  const { t, toggleLang, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['#about', t.nav.about],
    ['#skills', t.nav.skills],
    ['#projects', t.nav.projects],
    ['#experience', t.nav.experience],
    ['#contact', t.nav.contact],
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" className="logo">
          {lang === 'ar' ? 'موقعي' : 'MySite'}
        </a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleLang} aria-label="Switch language">
            {t.switchTo}
          </button>
          <ThemeToggle />
          <button
            className="icon-btn burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <button
      className="icon-btn"
      onClick={() => setTheme((th) => (th === 'dark' ? 'light' : 'dark'))}
      aria-label="Toggle theme"
      title="Theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

export function Hero() {
  const { t } = useLang();
  return (
    <header id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <span className="available-pill">
            <span className="dot" /> {t.hero.available}
          </span>
          <p className="greeting">{t.hero.greeting}</p>
          <h1>{t.hero.name}</h1>
          <h2 className="role">{t.hero.role}</h2>
          <p className="tagline">{t.hero.tagline}</p>
          <div className="cta-row">
            <a href="#contact" className="btn primary">{t.hero.cta}</a>
            <a href="/cv.pdf" download className="btn outline">{t.hero.downloadCV}</a>
          </div>
          <div className="social-row">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.key} href={s.href} target="_blank" rel="noreferrer" className="social-link" aria-label={s.key}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="avatar-ring">
            <img src={heroImg} alt="" onError={(e) => { e.target.style.display = 'none'; }} />
            <span className="emoji-fallback">👨‍💻</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">{t.about.title}</h2>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <div className="info-badges">
            <span className="badge">📍 {t.about.location}</span>
            <span className="badge">✉️ {t.about.email}</span>
          </div>
        </Reveal>
        <div className="stats-row">
          {t.about.stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const { t } = useLang();
  return (
    <section id="skills" className="section alt">
      <div className="container">
        <Reveal>
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-subtitle">{t.skills.subtitle}</p>
        </Reveal>
        <div className="skills-grid">
          {t.skills.items.map((s) => (
            <div className="skill reveal" key={s.name}>
              <div className="skill-head">
                <span>{s.name}</span>
                <span>{s.level}%</span>
              </div>
              <div className="bar">
                <div className="fill" style={{ width: `${s.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const { t } = useLang();
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-subtitle">{t.projects.subtitle}</p>
        </Reveal>
        <div className="projects-grid">
          {t.projects.items.map((p) => (
            <article className="project-card reveal" key={p.name}>
              <div className="project-emoji" aria-hidden="true">{p.emoji}</div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="tags">
                {p.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <a href="#contact" className="project-link">{t.projects.view} →</a>
                <a href="#contact" className="project-link">{t.projects.code} ⌨</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const { t } = useLang();
  return (
    <section id="experience" className="section alt">
      <div className="container">
        <Reveal>
          <h2 className="section-title">{t.experience.title}</h2>
        </Reveal>
        <div className="timeline">
          {t.experience.items.map((e) => (
            <div className="timeline-item reveal" key={e.role}>
              <span className="timeline-dot" aria-hidden="true" />
              <h3>{e.role} — {e.company}</h3>
              <span className="period">{e.period}</span>
              <p>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { t, lang } = useLang();
  // TODO: replace with your Formspree form ID (create one at https://formspree.io)
  const FORMSPREE_ID = 'myFormId';
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) e.target.reset();
    } catch {
      setStatus('error');
    }
  };

  const msg = {
    ar: {
      sending: 'جارٍ الإرسال...',
      success: 'تم الإرسال بنجاح، شكراً لتواصلك! ✅',
      error: 'حدث خطأ، حاول مرة أخرى. ❌',
    },
    en: {
      sending: 'Sending...',
      success: 'Sent successfully, thanks for reaching out! ✅',
      error: 'Something went wrong, please try again. ❌',
    },
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </Reveal>
        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <input type="text" placeholder={t.contact.name} required />
          <input type="email" placeholder={t.contact.email} required />
          <textarea placeholder={t.contact.message} rows="5" required />
          <button type="submit" className="btn primary" disabled={status === 'sending'}>
            {status === 'sending' ? msg[lang].sending : t.contact.send}
          </button>
          {status === 'success' && <p className="form-status success">{msg[lang].success}</p>}
          {status === 'error' && <p className="form-status error">{msg[lang].error}</p>}
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  const [year] = useState(() => new Date().getFullYear());
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {year} — {t.footer}</p>
        <div className="social-row">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.key} href={s.href} target="_blank" rel="noreferrer" className="social-link" aria-label={s.key}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
