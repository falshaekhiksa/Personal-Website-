import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { insert, find } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

export function hashPassword(password, salt) {
  salt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

export function verifyPassword(password, salt, hash) {
  const candidate = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(candidate, 'hex'), Buffer.from(hash, 'hex'));
}

export function issueToken(user) {
  return jwt.sign({ sub: user.id, username: user.username, role: user.role }, JWT_SECRET, {
    expiresIn: '8h',
  });
}

export function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'مطلوب تسجيل الدخول' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'انتهت الجلسة، أعد تسجيل الدخول' });
  }
}

export function ensureSeedUser() {
  const username = process.env.ADMIN_USERNAME || 'falshaekhi';
  const password = process.env.ADMIN_PASSWORD || 'Family@1234';
  if (!find('users', (u) => u.username === username)) {
    const { salt, hash } = hashPassword(password);
    insert('users', { username, salt, hash, role: 'admin', fullName: 'فهد الشيخي' });
  }
}
