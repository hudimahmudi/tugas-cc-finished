const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

function createToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(422).json({ message: 'Name, email, and password are required' });
    }
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedName || normalizedName.length > 100) {
      return res.status(422).json({ message: 'Name is required and must be 100 characters or fewer' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || normalizedEmail.length > 191) {
      return res.status(422).json({ message: 'Email format is invalid' });
    }
    if (password.length < 8 || password.length > 72) {
      return res.status(422).json({ message: 'Password must be at least 8 characters long' });
    }

    const existing = await db('users').where({ email: normalizedEmail }).first();
    if (existing) {
      return res.status(422).json({ message: 'This email is already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [id] = await db('users').insert({
      name: normalizedName,
      email: normalizedEmail,
      password_hash: passwordHash,
      role: 'creator',
    });

    const user = await db('users').where({ id }).first();
    res.status(201).json(publicUser(user));
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(422).json({ message: 'This email is already in use' });
    }
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return res.status(422).json({ message: 'Email and password are required' });
    }
    if (password.length > 72) return res.status(422).json({ message: 'Password is invalid' });

    const user = await db('users').where({ email: email.trim().toLowerCase() }).first();
    const valid = user && (await bcrypt.compare(password, user.password_hash));

    if (!valid) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }

    res.json({ token: createToken(user), user: publicUser(user) });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };