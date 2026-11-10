import { useState, useEffect } from 'react';
import { LangProvider } from './i18n';
import { Navbar, Hero, About, Skills, Experience, Contact, Footer } from './components.jsx';
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
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}

export default function App() {
  const route = useHashRoute();
  const page = route.startsWith('#/freelance') ? 'freelance' : route.startsWith('#/family') ? 'family' : 'home';

  return (
    <LangProvider>
      <Navbar />
      {page === 'freelance' ? <FreelancePage /> : page === 'family' ? <FamilyPage /> : <MainSite />}
      <Footer />
    </LangProvider>
  );
}
