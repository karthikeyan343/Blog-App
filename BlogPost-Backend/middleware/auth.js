const crypto = require('crypto');

const TOKEN_SECRET = process.env.JWT_SECRET || 'change-this-blog-admin-secret';

const base64Url = (value) => Buffer.from(value)
  .toString('base64')
  .replace(/=/g, '')
  .replace(/\+/g, '-')
  .replace(/\//g, '_');

const fromBase64Url = (value) => Buffer.from(
  value.replace(/-/g, '+').replace(/_/g, '/'),
  'base64'
).toString('utf8');

const sign = (data) => crypto
  .createHmac('sha256', TOKEN_SECRET)
  .update(data)
  .digest('base64')
  .replace(/=/g, '')
  .replace(/\+/g, '-')
  .replace(/\//g, '_');

const createToken = (payload) => {
  const header = base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64Url(JSON.stringify({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8
  }));

  return `${header}.${body}.${sign(`${header}.${body}`)}`;
};

const verifyToken = (token) => {
  const [header, body, signature] = token.split('.');

  if (!header || !body || !signature) {
    throw new Error('Invalid token');
  }

  const expectedSignature = sign(`${header}.${body}`);

  if (signature !== expectedSignature) {
    throw new Error('Invalid token signature');
  }

  const payload = JSON.parse(fromBase64Url(body));

  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }

  return payload;
};

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  createToken,
  requireAuth
};
