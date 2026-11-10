import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import express from 'express';
import { read, insert, update, find } from './db.js';
import { verifyPassword, issueToken, authenticate, ensureSeedUser } from './auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/quotes', (req, res) => {
  const { name, email, phone, service, budget, deadline, details } = req.body || {};
  if (!name || !service) {
    return res.status(400).json({ error: 'الاسم ونوع الخدمة مطلوبان' });
  }
  const quote = insert('quotes', {
    name,
    email: email || '',
    phone: phone || '',
    service,
    budget: budget || '',
    deadline: deadline || '',
    details: details || '',
    status: 'جديد',
  });
  res.status(201).json({ ok: true, id: quote.id });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'اسم المستخدم وكلمة المرور مطلوبان' });
  }
  const user = find('users', (u) => u.username === username);
  if (!user || !verifyPassword(password, user.salt, user.hash)) {
    return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
  }
  res.json({
    token: issueToken(user),
    user: { username: user.username, fullName: user.fullName, role: user.role },
  });
});

app.get('/api/auth/me', authenticate, (req, res) => {
  const user = find('users', (u) => u.id === req.user.sub);
  if (!user) return res.status(401).json({ error: 'المستخدم غير موجود' });
  res.json({ username: user.username, fullName: user.fullName, role: user.role });
});

app.post('/api/requests', authenticate, (req, res) => {
  const { title, category, details } = req.body || {};
  if (!title) return res.status(400).json({ error: 'عنوان الطلب مطلوب' });
  const row = insert('requests', {
    title,
    category: category || 'عام',
    details: details || '',
    status: 'قيد المراجعة',
    createdBy: req.user.username,
  });
  res.status(201).json(row);
});

app.get('/api/requests', authenticate, (req, res) => {
  res.json(read('requests'));
});

app.put('/api/requests/:id', authenticate, (req, res) => {
  const allowed = ['قيد المراجعة', 'قيد التنفيذ', 'مكتمل', 'مرفوض'];
  const status = req.body && req.body.status;
  if (!allowed.includes(status)) return res.status(400).json({ error: 'حالة غير صالحة' });
  const row = update('requests', req.params.id, { status });
  if (!row) return res.status(404).json({ error: 'الطلب غير موجود' });
  res.json(row);
});

app.post('/api/cases', authenticate, (req, res) => {
  const { title, court, number, notes } = req.body || {};
  if (!title) return res.status(400).json({ error: 'عنوان القضية مطلوب' });
  res.status(201).json(insert('cases', { title, court: court || '', number: number || '', notes: notes || '', status: 'نشطة' }));
});

app.get('/api/cases', authenticate, (req, res) => {
  res.json(read('cases'));
});

app.post('/api/documents', authenticate, (req, res) => {
  const { title, type, expiresAt, notes } = req.body || {};
  if (!title) return res.status(400).json({ error: 'عنوان المستند مطلوب' });
  res.status(201).json(insert('documents', { title, type: type || 'وكالة', expiresAt: expiresAt || null, notes: notes || '' }));
});

app.get('/api/documents', authenticate, (req, res) => {
  res.json(read('documents'));
});

app.post('/api/appointments', authenticate, (req, res) => {
  const { title, date, notes } = req.body || {};
  if (!title || !date) return res.status(400).json({ error: 'العنوان والتاريخ مطلوبان' });
  res.status(201).json(insert('appointments', { title, date, notes: notes || '' }));
});

app.get('/api/appointments', authenticate, (req, res) => {
  res.json(read('appointments'));
});

app.get('/api/alerts', authenticate, (req, res) => {
  const today = new Date();
  const soon = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const alerts = [];
  for (const doc of read('documents')) {
    if (doc.expiresAt) {
      const exp = new Date(doc.expiresAt);
      if (exp <= soon) {
        alerts.push({
          kind: exp < today ? 'منتهي' : 'قارب على الانتهاء',
          title: doc.title,
          date: doc.expiresAt,
        });
      }
    }
  }
  res.json(alerts);
});

const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.use((req, res) => res.status(404).json({ error: 'غير موجود' }));

ensureSeedUser();

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`بوابة فهد الشيخي تعمل على المنفذ ${PORT}`);
  });
}

export default app;
