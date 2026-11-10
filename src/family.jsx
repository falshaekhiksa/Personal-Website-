import { useState, useEffect, useCallback } from 'react';

const TOKEN_KEY = 'family_token';

async function api(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      ...(options.headers || {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || 'حدث خطأ');
  return body;
}

function Login({ onLogin }) {
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const { username, password } = Object.fromEntries(new FormData(e.target));
    try {
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      localStorage.setItem(TOKEN_KEY, data.token);
      onLogin(data.user);
    } catch (ex) {
      setError(ex.message);
    }
  }

  return (
    <main className="page">
      <div className="container login-wrap">
        <h1 className="section-title">صلة | بوابة العائلة</h1>
        <p className="section-subtitle">
          بوابة خاصة لتنظيم ومتابعة معاملات أفراد العائلة، وفق الوكالات والصلاحيات النظامية المعتمدة.
        </p>
        <form className="panel-form card" onSubmit={handleSubmit}>
          <label>
            اسم المستخدم
            <input name="username" required autoComplete="username" />
          </label>
          <label>
            كلمة المرور
            <input name="password" type="password" required autoComplete="current-password" />
          </label>
          <button type="submit" className="btn primary">دخول</button>
          {error && <p className="form-status error">{error}</p>}
        </form>
      </div>
    </main>
  );
}

function Table({ head, rows }) {
  return (
    <table className="data-table">
      <thead>
        <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

function AddForm({ title, fields, onSubmit }) {
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await onSubmit(Object.fromEntries(new FormData(e.target)));
      e.target.reset();
    } catch (ex) {
      setError(ex.message);
    }
  }

  return (
    <form className="panel-form card" onSubmit={handleSubmit}>
      <h3>{title}</h3>
      {fields.map((f) => (
        <label key={f.name}>
          {f.label}
          {f.type === 'select' ? (
            <select name={f.name} defaultValue={f.options[0]}>
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input name={f.name} type={f.type || 'text'} required={f.required} />
          )}
        </label>
      ))}
      <button type="submit" className="btn primary">إضافة</button>
      {error && <p className="form-status error">{error}</p>}
    </form>
  );
}

function Dashboard({ user, onLogout }) {
  const [requests, setRequests] = useState([]);
  const [cases, setCases] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const refresh = useCallback(async () => {
    const [r, c, d, a, al] = await Promise.all([
      api('/api/requests'),
      api('/api/cases'),
      api('/api/documents'),
      api('/api/appointments'),
      api('/api/alerts'),
    ]);
    setRequests(r);
    setCases(c);
    setDocuments(d);
    setAppointments(a);
    setAlerts(al);
  }, []);

  useEffect(() => {
    refresh().catch(() => {});
  }, [refresh]);

  return (
    <main className="page">
      <div className="container">
        <h1 className="section-title">لوحة المتابعة — {user.fullName}</h1>

        <section className="section">
          <h2 className="section-title">التنبيهات</h2>
          <div className="card">
            {alerts.length === 0 ? (
              <p>لا توجد تنبيهات حالياً.</p>
            ) : (
              <ul className="alerts-list">
                {alerts.map((a, i) => (
                  <li key={i}>{a.kind}: {a.title} ({a.date})</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">طلبات الخدمة</h2>
          <AddForm
            title="طلب خدمة جديد"
            fields={[
              { name: 'title', label: 'عنوان الطلب *', required: true },
              { name: 'category', label: 'التصنيف', type: 'select', options: ['عام', 'معاملة رسمية', 'متابعة قضية', 'وكالة', 'أخرى'] },
            ]}
            onSubmit={(data) => api('/api/requests', { method: 'POST', body: JSON.stringify(data) }).then(refresh)}
          />
          <Table
            head={['العنوان', 'التصنيف', 'الحالة']}
            rows={requests.map((r) => [r.title, r.category, r.status])}
          />
        </section>

        <section className="section">
          <h2 className="section-title">القضايا والمعاملات</h2>
          <AddForm
            title="إضافة قضية/معاملة"
            fields={[
              { name: 'title', label: 'العنوان *', required: true },
              { name: 'court', label: 'الجهة' },
              { name: 'number', label: 'الرقم' },
            ]}
            onSubmit={(data) => api('/api/cases', { method: 'POST', body: JSON.stringify(data) }).then(refresh)}
          />
          <Table
            head={['العنوان', 'الجهة', 'الرقم', 'الحالة']}
            rows={cases.map((c) => [c.title, c.court, c.number, c.status])}
          />
        </section>

        <section className="section">
          <h2 className="section-title">الوكالات والمستندات</h2>
          <AddForm
            title="إضافة مستند"
            fields={[
              { name: 'title', label: 'عنوان المستند *', required: true },
              { name: 'type', label: 'النوع', type: 'select', options: ['وكالة', 'عقد', 'صك', 'مستند رسمي'] },
              { name: 'expiresAt', label: 'تاريخ الانتهاء', type: 'date' },
            ]}
            onSubmit={(data) =>
              api('/api/documents', { method: 'POST', body: JSON.stringify({ ...data, expiresAt: data.expiresAt || null }) }).then(refresh)
            }
          />
          <Table
            head={['المستند', 'النوع', 'الانتهاء']}
            rows={documents.map((d) => [d.title, d.type, d.expiresAt ? String(d.expiresAt).slice(0, 10) : '—'])}
          />
        </section>

        <section className="section">
          <h2 className="section-title">سجل المواعيد والجلسات</h2>
          <AddForm
            title="إضافة موعد"
            fields={[
              { name: 'title', label: 'العنوان *', required: true },
              { name: 'date', label: 'التاريخ والوقت *', type: 'datetime-local', required: true },
            ]}
            onSubmit={(data) => api('/api/appointments', { method: 'POST', body: JSON.stringify(data) }).then(refresh)}
          />
          <Table
            head={['العنوان', 'الموعد']}
            rows={appointments.map((a) => [a.title, new Date(a.date).toLocaleString('ar-SA')])}
          />
        </section>

        <section className="section">
          <h2 className="section-title">روابط خدمات ناجز</h2>
          <div className="card">
            <ul className="alerts-list">
              <li><a href="https://najiz.sa" target="_blank" rel="noopener">بوابة ناجز</a></li>
              <li><a href="https://najiz.sa/mojhc" target="_blank" rel="noopener">الخدمات العدلية</a></li>
            </ul>
          </div>
        </section>

        <button className="btn outline" onClick={onLogout}>تسجيل الخروج</button>
      </div>
    </main>
  );
}

export default function FamilyPage() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setChecked(true);
      return;
    }
    api('/api/auth/me')
      .then((me) => setUser(me))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setChecked(true));
  }, []);

  if (!checked) return null;

  if (!user) return <Login onLogin={setUser} />;

  return (
    <Dashboard
      user={user}
      onLogout={() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      }}
    />
  );
}
