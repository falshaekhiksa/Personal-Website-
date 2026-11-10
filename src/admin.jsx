import { useState, useEffect, useCallback } from 'react';

const TOKEN_KEY = 'admin_token';
const STATUSES = ['جديد', 'قيد الدراسة', 'عرض مرسل', 'معتمد', 'مكتمل', 'مرفوض'];

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
      const session = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      if (session.user.role !== 'admin') throw new Error('هذه لوحة الإدارة — الدخول للمسؤولين فقط.');
      localStorage.setItem(TOKEN_KEY, session.token);
      onLogin(session.user);
    } catch (ex) {
      setError(ex.message);
    }
  }

  return (
    <main className="page">
      <div className="container login-wrap">
        <h1 className="section-title">لوحة الإدارة</h1>
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

function Stats({ stats }) {
  return (
    <div className="cards-grid">
      <div className="card"><h3>طلبات عرض السعر</h3><p>{stats.quotesTotal}</p></div>
      <div className="card"><h3>فواتير غير مدفوعة</h3><p>{stats.invoicesUnpaid}</p></div>
      <div className="card"><h3>إجمالي المدفوعات (ريال)</h3><p>{stats.revenue}</p></div>
      <div className="card"><h3>عدد العملاء</h3><p>{stats.clients}</p></div>
    </div>
  );
}

function AdminDashboard({ user, onLogout }) {
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState(null);
  const [msg, setMsg] = useState('');

  const refresh = useCallback(async () => {
    const [q, i, s] = await Promise.all([
      api('/api/admin/quotes'),
      api('/api/admin/invoices'),
      api('/api/admin/stats'),
    ]);
    setQuotes(q);
    setInvoices(i);
    setStats(s);
  }, []);

  useEffect(() => {
    refresh().catch(() => {});
  }, [refresh]);

  async function setStatus(quote, status) {
    setMsg('');
    try {
      await api(`/api/admin/quotes/${quote.id}`, { method: 'PUT', body: JSON.stringify({ status }) });
      setMsg(`تم تحديث حالة «${quote.service}» إلى: ${status} — أُرسلت رسالة حالة للعميل.`);
      refresh();
    } catch (ex) {
      setMsg(ex.message);
    }
  }

  async function issueInvoice(quote) {
    const amount = window.prompt('مبلغ الفاتورة بالريال:');
    if (!amount) return;
    const dueDate = window.prompt('تاريخ الاستحقاق (اختياري، بصيغة YYYY-MM-DD):') || '';
    setMsg('');
    try {
      await api('/api/admin/invoices', {
        method: 'POST',
        body: JSON.stringify({ quoteId: quote.id, amount: Number(amount), dueDate: dueDate || null }),
      });
      setMsg('تم إصدار الفاتورة وإشعار العميل.');
      refresh();
    } catch (ex) {
      setMsg(ex.message);
    }
  }

  return (
    <main className="page">
      <div className="container">
        <h1 className="section-title">لوحة الإدارة — {user.fullName}</h1>

        {stats && (
          <section className="section">
            <Stats stats={stats} />
          </section>
        )}

        {msg && <p className="form-status success">{msg}</p>}

        <section className="section">
          <h2 className="section-title">طلبات عرض السعر</h2>
          <table className="data-table">
            <thead>
              <tr><th>العميل</th><th>الخدمة</th><th>الميزانية</th><th>الحالة</th><th>إجراءات</th></tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id}>
                  <td>{q.name}</td>
                  <td>{q.service}</td>
                  <td>{q.budget || '—'}</td>
                  <td><span className="status-pill">{q.status}</span></td>
                  <td className="actions-cell">
                    <select defaultValue="" onChange={(e) => e.target.value && setStatus(q, e.target.value)}>
                      <option value="">تغيير الحالة...</option>
                      {STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <button className="btn small outline" onClick={() => issueInvoice(q)}>إصدار فاتورة</button>
                  </td>
                </tr>
              ))}
              {quotes.length === 0 && <tr><td colSpan="5">لا توجد طلبات.</td></tr>}
            </tbody>
          </table>
        </section>

        <section className="section">
          <h2 className="section-title">الفواتير</h2>
          <table className="data-table">
            <thead>
              <tr><th>العميل</th><th>الخدمة</th><th>المبلغ (ريال)</th><th>الحالة</th></tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id}>
                  <td>{i.clientName}</td>
                  <td>{i.service}</td>
                  <td>{i.amount}</td>
                  <td><span className="status-pill">{i.status}</span></td>
                </tr>
              ))}
              {invoices.length === 0 && <tr><td colSpan="4">لا توجد فواتير.</td></tr>}
            </tbody>
          </table>
        </section>

        <button className="btn outline" onClick={onLogout}>تسجيل الخروج</button>
      </div>
    </main>
  );
}

export default function AdminPage() {
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
        if (me.role !== 'admin') throw new Error('wrong-role');
        setUser(me);
      })
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setChecked(true));
  }, []);

  if (!checked) return null;

  if (!user) return <Login onLogin={setUser} />;

  return (
    <AdminDashboard
      user={user}
      onLogout={() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      }}
    />
  );
}
