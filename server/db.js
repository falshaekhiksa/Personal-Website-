import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');
const FILES = {
  users: 'users.json',
  requests: 'requests.json',
  cases: 'cases.json',
  documents: 'documents.json',
  appointments: 'appointments.json',
  quotes: 'quotes.json',
};

function ensureDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function read(name) {
  ensureDir();
  const file = path.join(DATA_DIR, FILES[name]);
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
}

export function write(name, rows) {
  ensureDir();
  fs.writeFileSync(path.join(DATA_DIR, FILES[name]), JSON.stringify(rows, null, 2), 'utf8');
}

export function insert(name, row) {
  const rows = read(name);
  row.id = row.id || String(Date.now()) + '-' + Math.random().toString(36).slice(2, 8);
  row.createdAt = row.createdAt || new Date().toISOString();
  rows.push(row);
  write(name, rows);
  return row;
}

export function update(name, id, patch) {
  const rows = read(name);
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  rows[idx] = { ...rows[idx], ...patch, updatedAt: new Date().toISOString() };
  write(name, rows);
  return rows[idx];
}

export function find(name, predicate) {
  return read(name).find(predicate) || null;
}
