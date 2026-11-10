import { useState, useEffect, useCallback } from 'react';

const TOKEN_KEY = 'client_token';

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

function AuthCard({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const data = Object.fromEntries(new FormData(e.target));
    try {
      if (mode === 'register') {
        await api('/api/auth/register', { method: 'POST', body: JSON.stringify(data) });
      }
      const session = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: data.username, password: data.password }),
      });
      if (session.user.role !== 'client') {
        throw new Error('هذه بوابة العملاء. استخدم بوابة الإدارة للدخول كمسؤول.');
      }
      localStorage.setItem(TOKEN_KEY, session.token);
      onLogin(session.user);
    } catch (ex) {
      setError(ex.message);
    }
  }

  return (
    <main className="page">
      <div className="container login-wrap">
        <h1 className="section-title">لوحة العميل</h1>
        <p className="section-subtitle">تابع طلباتك، عروضك، فواتيرك، ورسائل الحالة من مكان واحد.</p>
        <div className="card">
          <div className="tabs">
            <button className={mode === 'login' ? 'tab active' : 'tab'} onClick={() => setMode('login')}>تسجيل الدخول</button>
            <button className={mode === 'register' ? 'tab active' : 'tab'} onClick={() => setMode('register')}>حساب جديد</button>
          </div>
          <form className="panel-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <>
                <label>
                  الاسم الكامل *
                  <input name="fullName" required />
                </label>
                <label>
                  البريد الإلكتروني (لتتبع طلباتك)
                  <input name="email" type="email" />
                </label>
              </>
            )}
            <label>
              اسم المستخدم *
              <input name="username" required autoComplete="username" />
            </label>
            <label>
              كلمة المرور *
              <input name="password" type="password" required autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
            </label>
            <button type="submit" className="btn primary">{mode === 'login' ? 'دخول' : 'إنشاء الحساب'}</button>
            {error && <p className="form-status error">{error}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}

function ClientDashboard({ user, onLogout }) {
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [msg, setMsg] = useState('');

  const refresh = useCallback(async () => {
    const [q, i, n] = await Promise.all([
      api('/api/my/quotes'),
      api('/api/my/invoices'),
      api('/api/my/notifications'),
    ]);
    setQuotes(q);
    setInvoices(i);
    setNotifications(n);
  }, []);

  useEffect(() => {
    refresh().catch(() => {});
  }, [refresh]);

  async function pay(invoiceId) {
    const method = window.prompt('طريقة الدفع: مدى / بطاقة ائتمانية / تحويل بنكي');
    if (!method) return;
    setMsg('');
    try {
      await api(`/api/invoices/${invoiceId}/pay`, { method: 'POST', body: JSON.stringify({ method }) });
      setMsg('تم تسجيل الدفع بنجاح (وضع تجريبي — سيُربط بوابة دفع فعلية في الإنتاج).');
      refresh();
    } catch (ex) {
      setMsg(ex.message);
    }
  }

  return (
    <main className="page">
      <div className="container">
        <h1 className="section-title">لوحة العميل — {user.fullName}</h1>

        <section className="section">
          <h2 className="section-title">رسائل الحالة</h2>
          <div className="card">
            {notifications.length === 0 ? (
              <p>لا توجد رسائل حالياً.</p>
            ) : (
              <ul className="alerts-list">
                {notifications.map((n) => (
                  <li key={n.id} style={{ color: 'var(--accent-2)' }}>{n.message} — {new Date(n.createdAt).toLocaleString('ar-SA')}</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">طلباتي</h2>
          <table className="data-table">
            <thead>
              <tr><th>الخدمة</th><th>الحالة</th><th>التاريخ</th></tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id}>
                  <td>{q.service}</td>
                  <td><span className="status-pill">{q.status}</span></td>
                  <td>{new Date(q.createdAt).toLocaleDateString('ar-SA')}</td>
                </tr>
              ))}
              {quotes.length === 0 && (
                <tr><td colSpan="3">لا توجد طلبات بعد. أرسل طلب عرض سعر من صفحة الخدمات.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        <section className="section">
          <h2 className="section-title">الفواتير والمدفوعات</h2>
          {msg && <p className="form-status success">{msg}</p>}
          <table className="data-table">
            <thead>
              <tr><th>الخدمة</th><th>المبلغ (ريال)</th><th>الاستحقاق</th><th>الحالة</th><th></th></tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id}>
                  <td>{i.service}</td>
                  <td>{i.amount}</td>
                  <td>{i.dueDate || '—'}</td>
                  <td><span className="status-pill">{i.status}</span></td>
                  <td>{i.status !== 'مدفوعة' && <button className="btn small primary" onClick={() => pay(i.id)}>دفع</button>}</td>
                </tr>
              ))}
              {invoices.length === 0 && <tr><td colSpan="5">لا توجد فواتير.</td></tr>}
            </tbody>
          </table>
        </section>

        <button className="btn outline" onClick={onLogout}>تسجيل الخروج</button>
      </div>
    </main>
  );
}

export default function ClientPage() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setChecked(true);
      return;
    }
    api('/api/auth/me')
      .then((me) => {
        if (me.role !== 'client') throw new Error('wrong-role');
        setUser(me);
      })
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setChecked(true));
  }, []);

  if (!checked) return null;

  if (!user) return <AuthCard onLogin={setUser} />;

  return (
    <ClientDashboard
      user={user}
      onLogout={() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      }}
    />
  );
}
