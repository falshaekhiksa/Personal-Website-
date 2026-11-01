# الموقع الشخصي | Personal Website

موقع شخصي تعريفي (CV) مبني بـ React + Vite، يدعم العربية والإنجليزية مع تبديل فوري للغة والاتجاه (RTL/LTR).

## الأقسام
- الرئيسية (Hero)
- من أنا (About)
- المهارات (Skills) مع أشرطة تقدم
- الخبرة العملية (Experience) بشكل خط زمني
- تواصل معي (Contact) بنموذج تجريبي

## التشغيل
```bash
npm install
npm run dev      # خادم التطوير
npm run build    # بناء الإنتاج إلى dist/
npm run preview  # معاينة نسخة الإنتاج
```

## التخصيص
- النصوص والترجمات: `src/i18n.jsx`
- المكونات: `src/components.jsx`
- الألوان والتنسيق: `src/index.css` (متغيرات CSS في `:root`)
