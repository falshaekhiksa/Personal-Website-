import assert from 'assert';
import http from 'http';
import app from '../server/index.js';

const server = app.listen(0, async () => {
  const port = server.address().port;
  const base = 'http://127.0.0.1:' + port;
  let passed = 0;

  async function call(method, path, body, token) {
    const payload = body ? JSON.stringify(body) : null;
    return new Promise((resolve, reject) => {
      const req = http.request(
        base + path,
        {
          method,
          headers: {
            ...(payload ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } : {}),
            ...(token ? { Authorization: 'Bearer ' + token } : {}),
          },
        },
        (res) => {
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => resolve({ status: res.statusCode, body: data ? JSON.parse(data) : {} }));
        }
      );
      req.on('error', reject);
      if (payload) req.write(payload);
      req.end();
    });
  }

  try {
    let r = await call('GET', '/api/health');
    assert.strictEqual(r.status, 200);
    passed++;

    r = await call('POST', '/api/quotes', {});
    assert.strictEqual(r.status, 400);
    passed++;

    r = await call('POST', '/api/quotes', { name: 'عميل', service: 'برمجة وتطوير المواقع' });
    assert.strictEqual(r.status, 201);
    passed++;

    r = await call('POST', '/api/auth/login', { username: 'wrong', password: 'wrong' });
    assert.strictEqual(r.status, 401);
    passed++;

    r = await call('GET', '/api/requests');
    assert.strictEqual(r.status, 401);
    passed++;

    r = await call('POST', '/api/auth/login', {
      username: process.env.ADMIN_USERNAME || 'falshaekhi',
      password: process.env.ADMIN_PASSWORD || 'Family@1234',
    });
    assert.strictEqual(r.status, 200);
    const token = r.body.token;
    passed++;

    r = await call('POST', '/api/requests', { title: 'طلب تجريبي' }, token);
    assert.strictEqual(r.status, 201);
    passed++;

    r = await call('GET', '/api/requests', null, token);
    assert.strictEqual(r.status, 200);
    assert.strictEqual(r.body.length > 0, true);
    passed++;

    r = await call('POST', '/api/documents', { title: 'وكالة تجريبية', expiresAt: '2000-01-01' }, token);
    assert.strictEqual(r.status, 201);
    passed++;

    r = await call('GET', '/api/alerts', null, token);
    assert.strictEqual(r.status, 200);
    assert.strictEqual(r.body.length > 0, true);
    passed++;

    console.log(`OK: ${passed} اختبارات ناجحة`);
    server.close();
    process.exit(0);
  } catch (ex) {
    console.error('FAILED:', ex.message);
    server.close();
    process.exit(1);
  }
});
