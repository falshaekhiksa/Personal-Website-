import { useState, useEffect } from 'react';
import { LangProvider } from './i18n';
import {
  Navbar,
  Hero,
  About,
  Expertise,
  Platforms,
  Methodology,
  Values,
  Articles,
  Contact,
  LegalPage,
  Footer,
} from './components.jsx';
import FreelancePage from './freelance.jsx';
import FamilyPage from './family.jsx';

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

function MainSite() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Platforms />
      <Methodology />
      <Values />
      <Articles />
      <Contact />
    </>
  );
}

const LEGAL_PAGES = ['privacy', 'terms', 'disclaimer', 'cookies'];

export default function App() {
  const route = useHashRoute();
  const page = route.startsWith('#/freelance')
    ? 'freelance'
    : route.startsWith('#/family')
      ? 'family'
      : LEGAL_PAGES.some((p) => route === `#/${p}`)
        ? route.slice(2)
        : 'home';

  return (
    <LangProvider>
      <Navbar />
      {page === 'freelance' ? (
        <FreelancePage />
      ) : page === 'family' ? (
        <FamilyPage />
      ) : page === 'home' ? (
        <MainSite />
      ) : (
        <LegalPage page={page} />
      )}
      <Footer />
    </LangProvider>
  );
}
