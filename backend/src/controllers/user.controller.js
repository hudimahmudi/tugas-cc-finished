const db = require('../config/db');

async function listEditors(req, res, next) {
  try {
    if (!['creator', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Only creators can view available editors' });
    }

    const editors = await db('users')
      .where({ role: 'editor' })
      .select('id', 'name', 'email')
      .orderBy('name');

    res.json(editors);
  } catch (err) {
    next(err);
  }
}

module.exports = { listEditors };
