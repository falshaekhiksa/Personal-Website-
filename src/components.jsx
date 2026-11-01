import { useState } from 'react';
import { useLang } from './i18n.jsx';

export function Navbar() {
  const { t, toggleLang, lang } = useLang();
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <a href="#home" className="logo">
          {lang === 'ar' ? 'موقعي' : 'MySite'}
        </a>
        <ul className="nav-links">
          <li><a href="#about">{t.nav.about}</a></li>
          <li><a href="#skills">{t.nav.skills}</a></li>
          <li><a href="#experience">{t.nav.experience}</a></li>
          <li><a href="#contact">{t.nav.contact}</a></li>
        </ul>
        <button className="lang-btn" onClick={toggleLang}>{t.switchTo}</button>
      </div>
    </nav>
  );
}

export function Hero() {
  const { t } = useLang();
  return (
    <header id="home" className="hero">
      <div className="container">
        <p className="greeting">{t.hero.greeting}</p>
        <h1>{t.hero.name}</h1>
        <h2 className="role">{t.hero.role}</h2>
        <p className="tagline">{t.hero.tagline}</p>
        <div className="cta-row">
          <a href="#contact" className="btn primary">{t.hero.cta}</a>
          <a href="/cv.pdf" download className="btn outline">{t.hero.downloadCV}</a>
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
        <h2 className="section-title">{t.about.title}</h2>
        <p>{t.about.p1}</p>
        <p>{t.about.p2}</p>
        <div className="info-badges">
          <span className="badge">📍 {t.about.location}</span>
          <span className="badge">✉️ {t.about.email}</span>
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
        <h2 className="section-title">{t.skills.title}</h2>
        <p className="section-subtitle">{t.skills.subtitle}</p>
        <div className="skills-grid">
          {t.skills.items.map((s) => (
            <div className="skill" key={s.name}>
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

export function Experience() {
  const { t } = useLang();
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">{t.experience.title}</h2>
        <div className="timeline">
          {t.experience.items.map((e) => (
            <div className="timeline-item" key={e.role}>
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
  const { t } = useLang();
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
    <section id="contact" className="section alt">
      <div className="container">
        <h2 className="section-title">{t.contact.title}</h2>
        <p className="section-subtitle">{t.contact.subtitle}</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder={t.contact.name} required />
          <input type="email" placeholder={t.contact.email} required />
          <textarea placeholder={t.contact.message} rows="5" required />
          <button type="submit" className="btn primary" disabled={status === 'sending'}>
            {status === 'sending' ? msg[document.documentElement.lang === 'ar' ? 'ar' : 'en'].sending : t.contact.send}
          </button>
          {status === 'success' && <p className="form-status success">{msg[document.documentElement.lang === 'ar' ? 'ar' : 'en'].success}</p>}
          {status === 'error' && <p className="form-status error">{msg[document.documentElement.lang === 'ar' ? 'ar' : 'en'].error}</p>}
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} — {t.footer}</p>
      </div>
    </footer>
  );
}
