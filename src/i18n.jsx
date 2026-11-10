import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  ar: {
    dir: 'rtl',
    langName: 'العربية',
    switchTo: 'EN',
    nav: { about: 'من أنا', skills: 'المهارات', projects: 'المشاريع', experience: 'الخبرة', contact: 'تواصل معي' },
    hero: {
      greeting: 'مرحباً, أنا',
      name: 'اسمك هنا',
      role: 'مطوّر واجهات أمامية',
      tagline: 'أبني تجارب ويب حديثة وسريعة ومتجاوبة مع جميع الأجهزة.',
      cta: 'تواصل معي',
      downloadCV: 'تحميل السيرة الذاتية',
      available: 'متاح للعمل الحر',
    },
    about: {
      title: 'من أنا',
      p1: 'مطوّر واجهات أمامية شغوف ببناء مواقع وتطبيقات ويب جميلة وسهلة الاستخدام. أمتلك خبرة في تحويل التصاميم إلى كود نظيف وقابل للصيانة.',
      p2: 'أسعى دائماًً لتعلّم تقنيات جديدة وتطوير مهاراتي، وأؤمن بأن التفاصيل الصغيرة تصنع فرقاً كبيراً في تجربة المستخدم.',
      location: 'المدينة، الدولة',
      email: 'email@example.com',
      stats: [
        { value: '+3', label: 'سنوات خبرة' },
        { value: '+20', label: 'مشروع منجز' },
        { value: '+10', label: 'عميل سعيد' },
      ],
    },
    skills: {
      title: 'المهارات',
      subtitle: 'الأدوات والتقنيات التي أعمل بها',
      items: [
        { name: 'HTML / CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 },
        { name: 'Node.js', level: 70 },
        { name: 'Git', level: 75 },
        { name: 'UI/UX', level: 65 },
      ],
    },
    projects: {
      title: 'المشاريع',
      subtitle: 'مختارات من أعمالي الأخيرة',
      view: 'عرض المشروع',
      code: 'الكود',
      items: [
        {
          name: 'متجر إلكتروني',
          desc: 'متجر متكامل بسلة شراء ودفع إلكتروني ولوحة تحكم.',
          tags: ['React', 'Node.js', 'Stripe'],
          emoji: '🛒',
        },
        {
          name: 'لوحة تحليلات',
          desc: 'لوحة بيانات تفاعلية مع رسوم بيانية وتقارير فورية.',
          tags: ['React', 'Charts', 'API'],
          emoji: '📊',
        },
        {
          name: 'تطبيق مهام',
          desc: 'تطبيق إدارة مهام مع مزامنة سحابية ووضع ليلي.',
          tags: ['React', 'PWA', 'Firebase'],
          emoji: '✅',
        },
      ],
    },
    experience: {
      title: 'الخبرة العملية',
      items: [
        {
          role: 'مطوّر واجهات أمامية',
          company: 'اسم الشركة',
          period: '2023 — الآن',
          desc: 'تطوير واجهات مستخدم لمواقع وتطبيقات ويب باستخدام React وتحسين الأداء وتجربة المستخدم.',
        },
        {
          role: 'مطوّر ويب',
          company: 'اسم الشركة السابقة',
          period: '2021 — 2023',
          desc: 'بناء مواقع متجاوبة وصيانة كود قائم والتعاون مع فرق التصميم والباك-إند.',
        },
      ],
    },
    contact: {
      title: 'تواصل معي',
      subtitle: 'متاح للعمل الحر والمشاريع الجديدة',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'رسالتك',
      send: 'إرسال',
    },
    footer: 'جميع الحقوق محفوظة',
    social: { github: 'GitHub', linkedin: 'LinkedIn', twitter: 'Twitter' },
  },
  en: {
    dir: 'ltr',
    langName: 'English',
    switchTo: 'عربي',
    nav: { about: 'About', skills: 'Skills', projects: 'Projects', experience: 'Experience', contact: 'Contact' },
    hero: {
      greeting: "Hi, I'm",
      name: 'Your Name',
      role: 'Frontend Developer',
      tagline: 'I build modern, fast, and responsive web experiences.',
      cta: 'Contact Me',
      downloadCV: 'Download CV',
      available: 'Available for freelance work',
    },
    about: {
      title: 'About Me',
      p1: "I'm a frontend developer passionate about building beautiful and user-friendly websites and web apps. I have experience turning designs into clean, maintainable code.",
      p2: "I'm always learning new technologies and improving my skills, and I believe small details make a big difference in user experience.",
      location: 'City, Country',
      email: 'email@example.com',
      stats: [
        { value: '3+', label: 'Years of experience' },
        { value: '20+', label: 'Projects completed' },
        { value: '10+', label: 'Happy clients' },
      ],
    },
    skills: {
      title: 'Skills',
      subtitle: 'Tools and technologies I work with',
      items: [
        { name: 'HTML / CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 },
        { name: 'Node.js', level: 70 },
        { name: 'Git', level: 75 },
        { name: 'UI/UX', level: 65 },
      ],
    },
    projects: {
      title: 'Projects',
      subtitle: 'A selection of my recent work',
      view: 'View Project',
      code: 'Code',
      items: [
        {
          name: 'E-commerce Store',
          desc: 'A full store with cart, checkout, and an admin dashboard.',
          tags: ['React', 'Node.js', 'Stripe'],
          emoji: '🛒',
        },
        {
          name: 'Analytics Dashboard',
          desc: 'An interactive dashboard with charts and real-time reports.',
          tags: ['React', 'Charts', 'API'],
          emoji: '📊',
        },
        {
          name: 'Tasks App',
          desc: 'A task manager with cloud sync and a dark mode.',
          tags: ['React', 'PWA', 'Firebase'],
          emoji: '✅',
        },
      ],
    },
    experience: {
      title: 'Experience',
      items: [
        {
          role: 'Frontend Developer',
          company: 'Company Name',
          period: '2023 — Present',
          desc: 'Building user interfaces for websites and web apps using React, improving performance and UX.',
        },
        {
          role: 'Web Developer',
          company: 'Previous Company',
          period: '2021 — 2023',
          desc: 'Building responsive websites, maintaining existing code, and collaborating with design and backend teams.',
        },
      ],
    },
    contact: {
      title: 'Contact Me',
      subtitle: 'Available for freelance work and new projects',
      name: 'Name',
      email: 'Email',
      message: 'Your message',
      send: 'Send',
    },
    footer: 'All rights reserved',
    social: { github: 'GitHub', linkedin: 'LinkedIn', twitter: 'Twitter' },
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ar');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = translations[lang].dir;
  }, [lang]);

  const t = translations[lang];
  const toggleLang = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'));

  return (
    <LangContext.Provider value={{ t, lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
