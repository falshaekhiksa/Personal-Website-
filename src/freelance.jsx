import { useState } from 'react';

const SERVICES = [
  { title: 'بوصلة الأعمال', desc: 'تحليل النشاط وتحديد فرص التطوير.' },
  { title: 'انطلاقة رقمية', desc: 'بناء الهوية والموقع والحضور الإلكتروني.' },
  { title: 'مسار النمو', desc: 'تطوير المبيعات والتسويق والعمليات.' },
  { title: 'تشغيل بذكاء', desc: 'ترتيب الإجراءات والنماذج وسير العمل.' },
  { title: 'حوكمة واضحة', desc: 'السياسات والصلاحيات وإدارة الوثائق.' },
  { title: 'مكتبك الرقمي', desc: 'الخدمات الإدارية والمتابعة عن بُعد.' },
];

const PACKAGES = [
  { title: 'باقة البداية', desc: 'نقطة انطلاق مناسبة للمشاريع الصغيرة والاحتياجات المحددة.' },
  { title: 'باقة التأسيس', desc: 'تأسيس الحضور الرقمي والهوية والوثائق الأساسية.' },
  { title: 'باقة التطوير', desc: 'تطوير العمليات والمبيعات والتسويق بخطة تنفيذية.' },
  { title: 'باقة التمكين', desc: 'حوكمة وأنظمة وأتمتة متكاملة للنشاط.' },
  { title: 'باقة الشريك', desc: 'اشتراك شهري لمساندة إدارية وتقنية مستمرة.' },
  { title: 'باقة مخصصة', desc: 'حلول مصممة وفق احتياجك الفعلي.' },
];

const STEPS = [
  { title: 'إرسال الطلب', desc: 'عبر نموذج عرض السعر أو التواصل المباشر.' },
  { title: 'دراسة الاحتياج', desc: 'مراجعة التفاصيل وتحديد النطاق.' },
  { title: 'إرسال العرض', desc: 'عرض سعر واضح بمدة تنفيذ محددة.' },
  { title: 'اعتماد الاتفاق', desc: 'توثيق النطاق والمخرجات والمواعيد.' },
  { title: 'التنفيذ', desc: 'عمل منظم مع تحديثات دورية.' },
  { title: 'التسليم والمتابعة', desc: 'تسليم المخرجات ومتابعة ما بعد التسليم.' },
];

const PORTFOLIO = [
  { title: 'المواقع', desc: 'مواقع وحلول إلكترونية (نماذج تُحدَّث بالمشاريع الفعلية).' },
  { title: 'الخطط والتقارير', desc: 'خطط عمل وتقارير تحليلية قابلة للقياس.' },
  { title: 'الأنظمة الإدارية', desc: 'أنظمة تنظيم وإدارة وثائق وسير عمل.' },
  { title: 'النماذج والوثائق', desc: 'نماذج وسياسات وحوكمة جاهزة للاستخدام.' },
  { title: 'الحملات التسويقية', desc: 'حملات انطلاقة وتنشيط مبيعات.' },
];

const SERVICE_OPTIONS = SERVICES.map((s) => s.title).concat('حلول مخصصة', 'أخرى');

export default function FreelancePage() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'تعذر إرسال الطلب');
      setStatus('success');
      e.target.reset();
    } catch (ex) {
      setStatus('error');
      setError(ex.message);
    }
  }

  return (
    <main className="page">
      <header className="hero">
        <div className="container">
          <h1>فهد الشيخي للأعمال والحلول</h1>
          <p className="tagline">
            خدمات مدفوعة موثّقة بموجب وثائق وأنشطة العمل الحر، نحوّل التعقيد إلى خطوات واضحة، والخطط إلى نتائج.
          </p>
          <button
            className="btn primary"
            onClick={() => document.getElementById('quote').scrollIntoView({ behavior: 'smooth' })}
          >
            اطلب عرض سعر
          </button>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <h2 className="section-title">الخدمات</h2>
          <div className="cards-grid">
            {SERVICES.map((s) => (
              <div className="card" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2 className="section-title">باقات الخدمات</h2>
          <div className="cards-grid">
            {PACKAGES.map((p) => (
              <div className="card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">آلية العمل</h2>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div className="step" key={s.title}>
                <span className="num">{i + 1}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2 className="section-title">معرض الأعمال</h2>
          <div className="cards-grid">
            {PORTFOLIO.map((p) => (
              <div className="card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">آراء العملاء</h2>
          <div className="card">
            <p>«سيتم عرض آراء العملاء الحقيقية هنا بعد إتمام المشاريع.»</p>
          </div>
        </div>
      </section>

      <section className="section alt" id="quote">
        <div className="container">
          <h2 className="section-title">طلب عرض سعر</h2>
          <form className="panel-form" onSubmit={handleSubmit}>
            <label>
              الاسم *
              <input name="name" required />
            </label>
            <label>
              البريد الإلكتروني
              <input name="email" type="email" />
            </label>
            <label>
              رقم الجوال
              <input name="phone" />
            </label>
            <label>
              الخدمة المطلوبة *
              <select name="service" required defaultValue="">
                <option value="" disabled>
                  — اختر —
                </option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              الميزانية التقريبية
              <select name="budget" defaultValue="">
                <option value="">— غير محدد —</option>
                <option>أقل من 5,000 ريال</option>
                <option>5,000 — 15,000 ريال</option>
                <option>15,000 — 50,000 ريال</option>
                <option>أكثر من 50,000 ريال</option>
              </select>
            </label>
            <label>
              الموعد المطلوب للتسليم
              <input name="deadline" type="date" />
            </label>
            <label>
              وصف الاحتياج
              <textarea name="details" rows="4" />
            </label>
            <button type="submit" className="btn primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
            </button>
            {status === 'success' && <p className="form-status success">تم استلام طلبك، سيتم التواصل معك قريباً.</p>}
            {status === 'error' && <p className="form-status error">{error}</p>}
          </form>
          <p className="section-subtitle">
            نجمع الحد الأدنى من البيانات اللازم للتواصل وتقديم العرض فقط. الدفع وإصدار الفواتير الإلكترونية قريباً.
          </p>
        </div>
      </section>
    </main>
  );
}
