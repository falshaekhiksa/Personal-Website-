import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  ar: {
    dir: 'rtl',
    langName: 'العربية',
    switchTo: 'English',
    nav: {
      home: 'الرئيسية',
      about: 'من أنا',
      expertise: 'الخبرات',
      platforms: 'منصاتي',
      articles: 'المقالات',
      contact: 'تواصل معي',
      cta: 'استكشف منصاتي',
    },
    hero: {
      title: 'نحو حلول تصنع فرقاً',
      text: 'خبرة إدارية وقانونية وتقنية تتحول إلى خطوات واضحة، وحلول عملية تساعد الأفراد والمنشآت على تنظيم أعمالهم وتطوير حضورهم الرقمي.',
      aboutBtn: 'تعرّف عليّ',
      platformsBtn: 'استكشف المنصات',
      tagline: 'نحوّل التعقيد إلى خطوات واضحة، والخطط إلى نتائج.',
    },
    about: {
      title: 'خبرة تجمع الإدارة والأنظمة والتقنية',
      p1: 'أنا فهد علي الشيخي، أعمل في المجالات الإدارية والقانونية والتنظيمية، وأهتم بتطوير الأعمال، إدارة الأنظمة والوثائق، وبناء الحلول الرقمية التي تجعل الإجراءات أكثر وضوحاً وكفاءة.',
      p2: 'أؤمن بأن الحل الجيد لا يزيد العمل تعقيداً، بل يختصر الطريق، ويحفظ الحقوق، ويمنح صاحبه رؤية أوضح لاتخاذ القرار.',
      moreBtn: 'اقرأ المزيد عن خبراتي',
    },
    expertise: {
      title: 'مجالات الخبرة',
      items: [
        { name: 'الإدارة والمتابعة', desc: 'تنظيم الأعمال، متابعة المعاملات، إعداد التقارير، وتطوير الإجراءات بما يرفع جودة التنفيذ.' },
        { name: 'الأنظمة والحوكمة', desc: 'إعداد السياسات والنماذج، تنظيم الصلاحيات، إدارة الوثائق، ودعم الالتزام الإداري.' },
        { name: 'الأعمال القانونية', desc: 'البحث والصياغة وتنظيم المستندات ومتابعة الأعمال المصرح بها وفق الأطر النظامية.' },
        { name: 'التحول الرقمي', desc: 'تحويل الإجراءات الورقية والمتفرقة إلى مسارات رقمية أكثر سرعة ووضوحاً.' },
        { name: 'تطوير المواقع', desc: 'إنشاء مواقع عملية ومتجاوبة تعكس هوية النشاط وتسهّل وصول العميل إلى الخدمة.' },
        { name: 'تطوير الأعمال', desc: 'دراسة الاحتياج، تحديد فرص التحسين، وبناء خطط قابلة للتطبيق والقياس.' },
      ],
    },
    platforms: {
      title: 'ثلاثة مسارات، ورؤية واحدة',
      intro: 'اختر المسار الذي يناسب احتياجك، سواء كنت تبحث عن خبراتي المهنية، أو خدمة لتنمية أعمالك، أو الدخول إلى بوابة العائلة الخاصة.',
      personal: {
        title: 'فهد الشيخي',
        desc: 'تعرف على خبراتي، أعمالي، اهتماماتي المهنية، والمحتوى الذي أقدمه في الإدارة والأنظمة والتقنية.',
        btn: 'استكشف الموقع',
      },
      freelance: {
        title: 'فهد الشيخي للأعمال والحلول',
        desc: 'خدمات عملية في تطوير الأعمال، المواقع، الإدارة الرقمية، التسويق وتنظيم الوثائق.',
        btn: 'تصفح الخدمات',
      },
      family: {
        title: 'صلة | بوابة العائلة',
        desc: 'بوابة خاصة لتنظيم طلبات أفراد العائلة ومتابعة المعاملات والوثائق وفق الصلاحيات المعتمدة.',
        btn: 'دخول أفراد العائلة',
      },
    },
    methodology: {
      title: 'من الفكرة إلى نتيجة قابلة للقياس',
      steps: [
        { name: 'فهم الاحتياج', desc: 'الاستماع للطلب وتحديد المشكلة والنتيجة المطلوبة.' },
        { name: 'تصميم الحل', desc: 'وضع نطاق واضح وخطة تنفيذ مناسبة دون تعقيد زائد.' },
        { name: 'التنفيذ المنظم', desc: 'تنفيذ العمل على مراحل مع تحديثات واضحة.' },
        { name: 'التسليم والتطوير', desc: 'تسليم المخرجات ومتابعة فرص التحسين.' },
      ],
    },
    values: {
      title: 'قيم العمل',
      items: [
        { name: 'الوضوح', desc: 'كل طلب يبدأ بنطاق مفهوم، ومخرجات محددة، ومسؤوليات واضحة.' },
        { name: 'الدقة', desc: 'العناية بالتفاصيل وتوثيق الأعمال بما يحفظ جودة النتائج.' },
        { name: 'الخصوصية', desc: 'التعامل المسؤول مع المعلومات والوثائق وعدم استخدامها خارج الغرض المحدد.' },
        { name: 'التطوير المستمر', desc: 'بناء الحل بطريقة تسمح بتحسينه وتوسيعه مستقبلاً.' },
      ],
    },
    articles: {
      title: 'أحدث المقالات',
      subtitle: 'معرفة قابلة للتطبيق',
      allBtn: 'عرض جميع المقالات',
      items: [
        { title: 'كيف تحوّل إجراءات العمل المتفرقة إلى مسار واضح؟', desc: 'خطوات عملية لتوثيق الإجراءات، تحديد المسؤوليات، وتقليل التأخير والتكرار.' },
        { title: 'متى يحتاج نشاطك إلى موقع إلكتروني احترافي؟', desc: 'مؤشرات تساعدك على اختيار الموقع المناسب وتجنب المميزات غير الضرورية.' },
        { title: 'إدارة الوثائق ليست مجرد أرشفة', desc: 'كيف تتحول الوثائق المنظمة إلى أداة لحفظ الحقوق، تسريع العمل، ودعم القرار.' },
      ],
    },
    contact: {
      title: 'لديك فكرة أو احتياج؟ لنحوّله إلى خطة واضحة',
      text: 'سواء كنت تبحث عن تطوير مشروع، إنشاء موقع، تنظيم إجراءات، أو مناقشة فرصة تعاون، يمكنك إرسال تفاصيل طلبك وسأتواصل معك عبر القناة المناسبة.',
      startBtn: 'ابدأ طلبك',
      whatsappBtn: 'تواصل عبر واتساب',
    },
    footer: {
      brand: 'فهد علي الشيخي',
      brandDesc: 'أعمال وحلول إدارية وقانونية وتقنية.',
      quickTitle: 'روابط سريعة',
      quick: ['من أنا', 'الخبرات', 'الأعمال والحلول', 'المقالات', 'تواصل معي'],
      platformsTitle: 'المنصات',
      platformsLinks: ['منصة العمل الحر', 'بوابة العائلة', 'طلب عرض سعر'],
      legalTitle: 'المعلومات النظامية',
      legal: {
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الاستخدام',
        disclaimer: 'إخلاء المسؤولية',
        cookies: 'سياسة ملفات الارتباط',
      },
      copyright: '© فهد علي الشيخي. جميع الحقوق محفوظة.',
    },
    legalPages: {
      privacy: {
        title: 'سياسة الخصوصية',
        body: 'نجمع الحد الأدنى من البيانات اللازم للتواصل وتقديم الخدمة، ولا نستخدمها خارج الغرض المحدد، ونحفظها للمدة اللازمة فقط. يمكن طلب تصحيح بياناتك أو حذفها عبر قنوات التواصل.',
      },
      terms: {
        title: 'شروط الاستخدام',
        body: 'يُستخدم هذا الموقع لتقديم محتوى تعريفي وخدمات احترافية وفق الاتفاقات الموثقة. تُحدد نطاق كل خدمة ومخرجاتها ومسؤولياتها في العرض والاتفاق المعتمد قبل التنفيذ.',
      },
      disclaimer: {
        title: 'إخلاء المسؤولية',
        body: 'لا يقدَّم عبر هذا الموقع استشارات قانونية للعامة، ولا يُعد مكتب محاماة. بوابة العائلة بوابة خاصة لتنظيم ومتابعة معاملات أفراد العائلة وفق الوكالات والصلاحيات النظامية المعتمدة.',
      },
      cookies: {
        title: 'سياسة ملفات الارتباط',
        body: 'نستخدم التخزين المحلي للمتصفح فقط لحفظ جلسة الدخول لبوابة العائلة. لا نستخدم أدوات تتبع تجارية، ولا نجمع بيانات تصفح لأغراض إعلانية.',
      },
    },
  },
  en: {
    dir: 'ltr',
    langName: 'English',
    switchTo: 'العربية',
    nav: {
      home: 'Home',
      about: 'About',
      expertise: 'Expertise',
      platforms: 'Platforms',
      articles: 'Articles',
      contact: 'Contact',
      cta: 'Explore Platforms',
    },
    hero: {
      title: 'Solutions that make a difference',
      text: 'Administrative, legal, and technical expertise turned into clear steps and practical solutions that help individuals and organizations organize their work and grow their digital presence.',
      aboutBtn: 'Get to Know Me',
      platformsBtn: 'Explore Platforms',
      tagline: 'We turn complexity into clear steps, and plans into results.',
    },
    about: {
      title: 'Expertise across administration, governance, and technology',
      p1: "I'm Fahad Al-Shaikhi. I work in administrative, legal, and organizational fields, focusing on business development, systems and document management, and digital solutions that make procedures clearer and more efficient.",
      p2: 'I believe a good solution never adds complexity — it shortens the path, protects rights, and gives its owner a clearer view for decision-making.',
      moreBtn: 'Read more about my expertise',
    },
    expertise: {
      title: 'Areas of Expertise',
      items: [
        { name: 'Administration & Follow-up', desc: 'Organizing work, tracking transactions, preparing reports, and improving procedures.' },
        { name: 'Governance & Systems', desc: 'Policies and forms, authorities, document management, and administrative compliance.' },
        { name: 'Legal Affairs', desc: 'Research, drafting, document organization, and authorized follow-up within regulatory frameworks.' },
        { name: 'Digital Transformation', desc: 'Turning scattered paper procedures into faster, clearer digital paths.' },
        { name: 'Website Development', desc: 'Practical, responsive websites that reflect your identity and connect clients to your services.' },
        { name: 'Business Development', desc: 'Needs assessment, improvement opportunities, and executable, measurable plans.' },
      ],
    },
    platforms: {
      title: 'Three paths, one vision',
      intro: 'Choose the path that fits your needs: my professional expertise, services to grow your business, or the private family portal.',
      personal: {
        title: 'Fahad Al-Shaikhi',
        desc: 'My expertise, work, professional interests, and content in administration, systems, and technology.',
        btn: 'Explore Site',
      },
      freelance: {
        title: 'Al-Shaikhi Business & Solutions',
        desc: 'Practical services in business development, websites, digital administration, marketing, and document organization.',
        btn: 'Browse Services',
      },
      family: {
        title: 'Sila | Family Portal',
        desc: 'A private portal for organizing family requests and tracking transactions and documents per authorized powers.',
        btn: 'Family Login',
      },
    },
    methodology: {
      title: 'From idea to a measurable result',
      steps: [
        { name: 'Understand the need', desc: 'Listen to the request and define the problem and desired outcome.' },
        { name: 'Design the solution', desc: 'A clear scope and a fitting execution plan without excess complexity.' },
        { name: 'Organized execution', desc: 'Work delivered in stages with clear updates.' },
        { name: 'Delivery & improvement', desc: 'Deliver outputs and follow up on improvement opportunities.' },
      ],
    },
    values: {
      title: 'Work Values',
      items: [
        { name: 'Clarity', desc: 'Every request starts with an understood scope, defined outputs, and clear responsibilities.' },
        { name: 'Precision', desc: 'Attention to detail and documented work that preserves quality.' },
        { name: 'Privacy', desc: 'Responsible handling of information, never used beyond its stated purpose.' },
        { name: 'Continuous improvement', desc: 'Solutions built to be improved and extended over time.' },
      ],
    },
    articles: {
      title: 'Latest Articles',
      subtitle: 'Applicable knowledge',
      allBtn: 'View all articles',
      items: [
        { title: 'How to turn scattered procedures into a clear path', desc: 'Practical steps to document procedures, define responsibilities, and reduce delays.' },
        { title: 'When does your business need a professional website?', desc: 'Indicators to choose the right website and avoid unnecessary features.' },
        { title: 'Document management is not just archiving', desc: 'How organized documents protect rights, speed up work, and support decisions.' },
      ],
    },
    contact: {
      title: 'Have an idea or a need? Let\'s turn it into a clear plan',
      text: 'Whether you are developing a project, building a website, organizing procedures, or discussing a partnership, send your details and I will reach out.',
      startBtn: 'Start Your Request',
      whatsappBtn: 'WhatsApp',
    },
    footer: {
      brand: 'Fahad Al-Shaikhi',
      brandDesc: 'Administrative, legal, and technology solutions.',
      quickTitle: 'Quick Links',
      quick: ['About', 'Expertise', 'Business & Solutions', 'Articles', 'Contact'],
      platformsTitle: 'Platforms',
      platformsLinks: ['Freelance Platform', 'Family Portal', 'Request a Quote'],
      legalTitle: 'Legal',
      legal: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
        disclaimer: 'Disclaimer',
        cookies: 'Cookie Policy',
      },
      copyright: '© Fahad Al-Shaikhi. All rights reserved.',
    },
    legalPages: {
      privacy: {
        title: 'Privacy Policy',
        body: 'We collect only the minimum data needed to communicate and deliver the service, use it solely for its stated purpose, and retain it only as long as necessary. You may request correction or deletion of your data via our contact channels.',
      },
      terms: {
        title: 'Terms of Use',
        body: 'This site provides informational content and professional services under documented agreements. The scope, outputs, and responsibilities of each service are defined in the approved quote and agreement before execution.',
      },
      disclaimer: {
        title: 'Disclaimer',
        body: 'This site does not offer legal services to the public and is not a licensed law firm. The family portal is a private gateway for organizing family members\' transactions under authorized powers of attorney.',
      },
      cookies: {
        title: 'Cookie Policy',
        body: 'We use browser local storage only to keep the family portal session. We do not use commercial trackers or collect browsing data for advertising.',
      },
    },
  },
};

const LangContext = createContext({ lang: 'ar', t: translations.ar, toggleLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = translations[lang].dir;
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'));

  return <LangContext.Provider value={{ lang, t: translations[lang], toggleLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
