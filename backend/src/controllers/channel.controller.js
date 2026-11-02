const db = require('../config/db');
const { applyChannelAccess } = require('../middleware/contentAccess');

const PLATFORMS = ['youtube', 'tiktok', 'instagram', 'linkedin'];

async function listChannels(req, res, next) {
  try {
    const channels = await applyChannelAccess(db('channels'), req.user)
      .distinct('channels.id', 'channels.platform', 'channels.handle_name', 'channels.created_at')
      .orderBy('id');

    res.json(channels);
  } catch (err) {
    next(err);
  }
}

async function createChannel(req, res, next) {
  try {
    if (req.user.role === 'editor') {
      return res.status(403).json({ message: 'Editors cannot add channels' });
    }
    const { platform, handle_name } = req.body;

    if (!PLATFORMS.includes(platform)) {
      return res.status(422).json({ message: 'Platform is invalid' });
    }
    if (typeof handle_name !== 'string' || !handle_name.trim()) {
      return res.status(422).json({ message: 'Account name is required' });
    }
    if (handle_name.trim().length > 100) {
      return res.status(422).json({ message: 'Account name must be 100 characters or fewer' });
    }

    const [id] = await db('channels').insert({
      user_id: req.user.id,
      platform,
      handle_name: handle_name.trim(),
    });

    const channel = await db('channels').where({ id }).first();
    res.status(201).json(channel);
  } catch (err) {
    next(err);
  }
}

module.exports = { listChannels, createChannel };