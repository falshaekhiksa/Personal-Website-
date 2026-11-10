# الموقع الشخصي | Personal Website

موقع شخصي تعريفي (Portfolio) مبني بـ React + Vite، يدعم العربية والإنجليزية مع تبديل فوري للغة والاتجاه (RTL/LTR)، ووضع ليلي/نهاري.

## الميزات
- 🌙 **وضع ليلي/نهاري** — تبديل فوري مع حفظ التفضيل في المتصفح
- 🌍 **ثنائي اللغة** — عربي/إنجليزي مع RTL/LTR تلقائي
- 🏠 **الرئيسية (Hero)** — صورة داخل حلقة متدرجة، شارة توفر، روابط اجتماعية
- 👤 **من أنا** — نبذة + إحصائيات (خبرة، مشاريع، عملاء)
- 🛠️ **المهارات** — أشرطة تقدم متدرجة
- 💼 **المشاريع** — بطاقات مع وسوم تقنية وروابط
- 📈 **الخبرة** — خط زمني بنقاط
- ✉️ **تواصل** — نموذج جاهز للربط مع Formspree
- ✨ **تأثيرات ظهور** عند التمرير + قائمة جوال متجاوبة

## التشغيل
```bash
npm install
npm run dev      # خادم التطوير
npm run build    # بناء الإنتاج إلى dist/
npm run preview  # معاينة نسخة الإنتاج
npm run lint     # فحص الكود (oxlint)
```

## النشر

### GitHub Pages (تلقائي)
مضبوط مسبقاً عبر `.github/workflows/deploy.yml` — أي push إلى `main` ينشر الموقع تلقائياً.
فعّل Pages من: **Settings → Pages → Source: GitHub Actions**، ثم عند البناء المحلي استخدم:
```bash
VITE_BASE=/Personal-Website-/ npm run build
```

### نشر يدوي (Vercel / Netlify / أي استضافة ثابتة)
```bash
npm run build   # ثم ارفع مجلد dist/
```

## التخصيص
| ماذا | أين |
|---|---|
| النصوص والترجمات | `src/i18n.jsx` |
| المكونات وروابط التواصل | `src/components.jsx` (`SOCIAL_LINKS`) |
| الألوان والثيمات | `src/index.css` (متغيرات `:root` و `[data-theme='light']`) |
| معرف نموذج Formspree | `src/components.jsx` (`FORMSPREE_ID`) |
| ملف السيرة الذاتية | ضع `cv.pdf` في `public/` |
| صورة الملف الشخصي | استبدل `src/assets/hero.png` |
| SEO و Open Graph | `index.html` |

## بنية المشروع
```
├── index.html            # SEO + Open Graph
├── src/
│   ├── main.jsx          # نقطة الدخول
│   ├── App.jsx           # تجميع الأقسام
│   ├── i18n.jsx          # الترجمات + مزوّد اللغة
│   ├── components.jsx    # كل المكونات
│   └── index.css         # التصميم الكامل
└── .github/workflows/     # CI + نشر GitHub Pages
```
