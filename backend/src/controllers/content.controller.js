const db = require('../config/db');
const {
  applyContentAccess,
  findAccessibleContent,
} = require('../middleware/contentAccess');

const STATUSES = ['idea', 'scripting', 'recording', 'editing', 'ready', 'published'];
const FORMATS = ['short_video', 'long_video', 'carousel', 'single_post'];
const PRIORITIES = ['low', 'medium', 'high'];
const METRICS = ['views_count', 'likes_count', 'comments_count', 'shares_count'];

function validUrl(value) {
  if (typeof value !== 'string' || value.length > 255) return false;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validateContent(body, { creating = false } = {}) {
  const errors = [];
  for (const field of ['description', 'script_draft', 'review_notes']) {
    if (body[field] != null && typeof body[field] !== 'string') errors.push(`${field} must be a string`);
  }
  if (typeof body.title !== 'string' || !body.title.trim()) errors.push('Content title is required');
  else if (body.title.trim().length > 255) errors.push('Content title must be 255 characters or fewer');
  if (!Number.isSafeInteger(Number(body.channel_id)) || Number(body.channel_id) <= 0) errors.push('A channel must be selected');
  if (!FORMATS.includes(body.format_type)) errors.push('Content format is invalid');
  if (body.priority !== undefined && !PRIORITIES.includes(body.priority)) errors.push('Priority is invalid');
  if (!creating && body.status !== undefined && !STATUSES.includes(body.status)) errors.push('Content status is invalid');
  if (body.scheduled_date && !validDate(body.scheduled_date)) errors.push('Scheduled date is invalid');
  if (body.published_url && !validUrl(body.published_url)) errors.push('Publication URL must use HTTP or HTTPS');
  if (body.draft_url && !validUrl(body.draft_url)) errors.push('Draft URL must use HTTP or HTTPS');
  return errors;
}

function respondValidation(res, errors) {
  if (errors.length) {
    res.status(422).json({ message: errors[0], errors });
    return true;
  }
  return false;
}

async function listContents(req, res, next) {
  try {
    const query = applyContentAccess(db('contents'), req.user)
      .join('channels', 'contents.channel_id', 'channels.id')
      .join('users as content_owner', 'contents.user_id', 'content_owner.id')
      .select(
        'contents.id', 'contents.channel_id', 'channels.platform', 'channels.handle_name',
        'content_owner.name as owner_name',
        'contents.title', 'contents.description', 'contents.script_draft', 'contents.draft_url', 'contents.review_notes',
        'contents.format_type', 'contents.status', 'contents.priority',
        'contents.scheduled_date', 'contents.published_date', 'contents.published_url',
        'contents.created_at', 'contents.updated_at',
      );

    if (req.query.status) {
      if (!STATUSES.includes(req.query.status)) return res.status(422).json({ message: 'Status filter is invalid' });
      query.where('contents.status', req.query.status);
    }
    if (req.query.channel_id) {
      if (!/^\d+$/.test(req.query.channel_id)) return res.status(422).json({ message: 'Channel filter is invalid' });
      query.where('contents.channel_id', req.query.channel_id);
    }
    if (req.query.format_type) {
      if (!FORMATS.includes(req.query.format_type)) return res.status(422).json({ message: 'Format filter is invalid' });
      query.where('contents.format_type', req.query.format_type);
    }

    const contents = await query.orderBy('contents.updated_at', 'desc');
    const ids = contents.map((content) => content.id);
    const [checklists, snapshots] = ids.length
      ? await Promise.all([
        db('content_checklists').whereIn('content_id', ids).orderBy('id'),
        db('content_metrics').whereIn('content_id', ids).orderBy('recorded_at', 'desc').orderBy('id', 'desc'),
      ])
      : [[], []];

    const checklistsByContent = new Map();
    for (const item of checklists) {
      if (!checklistsByContent.has(item.content_id)) checklistsByContent.set(item.content_id, []);
      checklistsByContent.get(item.content_id).push(item);
    }
    const metricsByContent = new Map();
    for (const snapshot of snapshots) {
      if (!metricsByContent.has(snapshot.content_id)) metricsByContent.set(snapshot.content_id, snapshot);
    }

    res.json(contents.map((content) => ({
      ...content,
      checklists: checklistsByContent.get(content.id) || [],
      metrics: metricsByContent.get(content.id) || null,
    })));
  } catch (err) {
    next(err);
  }
}

async function getContent(req, res, next) {
  try {
    const content = await findAccessibleContent(req.user, req.params.id);
    if (!content) return res.status(404).json({ message: 'Content not found' });
    const [checklists, metrics] = await Promise.all([
      db('content_checklists').where({ content_id: content.id }).orderBy('id'),
      db('content_metrics').where({ content_id: content.id }).orderBy('recorded_at', 'desc').orderBy('id', 'desc'),
    ]);
    res.json({ ...content, checklists, metrics });
  } catch (err) {
    next(err);
  }
}

async function createContent(req, res, next) {
  try {
    if (req.user.role === 'editor') return res.status(403).json({ message: 'Editors cannot create content ideas' });
    if (respondValidation(res, validateContent(req.body, { creating: true }))) return;
    const channelQuery = db('channels').where({ id: req.body.channel_id });
    if (req.user.role !== 'admin') channelQuery.where({ user_id: req.user.id });
    const channel = await channelQuery.first();
    if (!channel) return res.status(422).json({ message: 'Channel not found in this account' });

    const [id] = await db('contents').insert({
      user_id: req.user.id,
      channel_id: channel.id,
      title: req.body.title.trim(),
      description: typeof req.body.description === 'string' ? req.body.description.trim() : null,
      script_draft: typeof req.body.script_draft === 'string' ? req.body.script_draft.trim() : null,
      draft_url: req.body.draft_url || null,
      review_notes: typeof req.body.review_notes === 'string' ? req.body.review_notes.trim() : null,
      format_type: req.body.format_type,
      priority: req.body.priority || 'medium',
      scheduled_date: req.body.scheduled_date || null,
    });
    const content = await findAccessibleContent(req.user, id);
    res.status(201).json(content);
  } catch (err) {
    next(err);
  }
}

async function updateContent(req, res, next) {
  try {
    const content = await findAccessibleContent(req.user, req.params.id);
    if (!content) return res.status(404).json({ message: 'Content not found' });
    if (content.status === 'published') return res.status(409).json({ message: 'Published content cannot be changed' });
    if (respondValidation(res, validateContent(req.body))) return;

    const requestedStatus = req.body.status || content.status;
    const currentIndex = STATUSES.indexOf(content.status);
    const nextIndex = STATUSES.indexOf(requestedStatus);
    if (nextIndex < currentIndex) return res.status(422).json({ message: 'Content cannot move to an earlier stage' });
    if (nextIndex > currentIndex + 1) return res.status(422).json({ message: 'Content must progress through each stage in order' });
    if (req.user.role === 'editor' && (content.status === 'idea' || content.status === 'scripting' || nextIndex < 2)) {
      return res.status(403).json({ message: 'Editors can only manage content from the Recording stage onward' });
    }
    if (req.user.role === 'editor' && nextIndex === 5) return res.status(403).json({ message: 'Editors cannot publish content' });
    if (requestedStatus === 'published' && !validUrl(req.body.published_url || content.published_url || '')) {
      return res.status(422).json({ message: 'A valid publication URL is required before publishing content' });
    }
    if (nextIndex >= 1 && (!req.body.script_draft?.trim() || !req.body.scheduled_date)) {
      return res.status(422).json({ message: 'A script and scheduled date are required before moving content to Scripting' });
    }
    if (nextIndex >= 3) {
      const checklistItems = await db('content_checklists').where({ content_id: content.id });
      if (!checklistItems.length || checklistItems.some((item) => !item.is_completed)) {
        return res.status(422).json({ message: 'Complete all production checklist items before moving content to Editing' });
      }
    }
    if (nextIndex >= 4 && (!validUrl(req.body.draft_url || '') || !req.body.review_notes?.trim())) {
      return res.status(422).json({ message: 'A draft link and review notes are required before content is Ready to publish' });
    }

    const channelQuery = db('channels').where({ id: req.body.channel_id });
    if (req.user.role === 'creator') channelQuery.where({ user_id: content.user_id });
    if (req.user.role === 'editor') channelQuery.where({ user_id: content.user_id });
    const channel = await channelQuery.first();
    if (!channel) return res.status(422).json({ message: 'Channel not found in this account' });

    const changes = {
      channel_id: channel.id,
      title: req.body.title.trim(),
      description: typeof req.body.description === 'string' ? req.body.description.trim() : null,
      script_draft: typeof req.body.script_draft === 'string' ? req.body.script_draft.trim() : null,
      draft_url: req.body.draft_url || null,
      review_notes: typeof req.body.review_notes === 'string' ? req.body.review_notes.trim() : null,
      format_type: req.body.format_type,
      priority: req.body.priority || content.priority,
      status: requestedStatus,
      scheduled_date: req.body.scheduled_date || null,
      published_url: req.body.published_url || null,
    };
    if (requestedStatus === 'published' && content.status !== 'published') {
      changes.published_date = new Date().toISOString().slice(0, 10);
    }
    await db('contents').where({ id: content.id }).update(changes);
    res.json(await findAccessibleContent(req.user, content.id));
  } catch (err) {
    next(err);
  }
}

async function deleteContent(req, res, next) {
  try {
    const content = await findAccessibleContent(req.user, req.params.id);
    if (!content) return res.status(404).json({ message: 'Content not found' });
    if (req.user.role === 'editor') return res.status(403).json({ message: 'Editors cannot delete content' });
    if (content.status === 'published') return res.status(409).json({ message: 'Published content cannot be deleted' });
    await db('contents').where({ id: content.id }).delete();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function replaceChecklists(req, res, next) {
  try {
    const content = await findAccessibleContent(req.user, req.params.id);
    if (!content) return res.status(404).json({ message: 'Content not found' });
    if (content.status === 'published') return res.status(409).json({ message: 'The checklist for published content cannot be changed' });
    if (req.user.role === 'editor' && !['recording', 'editing', 'ready'].includes(content.status)) {
      return res.status(403).json({ message: 'Editors can only manage checklists during production' });
    }
    if (!Array.isArray(req.body.items) || req.body.items.length > 100) {
      return res.status(422).json({ message: 'The checklist must be a list of no more than 100 tasks' });
    }
    const items = req.body.items;
    if (items.some((item) => typeof item.task_name !== 'string' || !item.task_name.trim() || item.task_name.trim().length > 255 || typeof item.is_completed !== 'boolean')) {
      return res.status(422).json({ message: 'Each task must have a name and a valid completion status' });
    }
    const saved = await db.transaction(async (trx) => {
      await trx('content_checklists').where({ content_id: content.id }).delete();
      if (items.length) {
        await trx('content_checklists').insert(items.map((item) => ({
          content_id: content.id,
          task_name: item.task_name.trim(),
          is_completed: item.is_completed,
        })));
      }
      return trx('content_checklists').where({ content_id: content.id }).orderBy('id');
    });
    res.json(saved);
  } catch (err) {
    next(err);
  }
}

async function createMetricSnapshot(req, res, next) {
  try {
    const content = await findAccessibleContent(req.user, req.params.id);
    if (!content) return res.status(404).json({ message: 'Content not found' });
    if (content.status !== 'published') return res.status(409).json({ message: 'Metrics can only be recorded for published content' });
    const values = {};
    for (const key of METRICS) {
      const value = req.body[key];
      if (!Number.isSafeInteger(value) || value < 0 || value > 2147483647) {
        return res.status(422).json({ message: 'All metrics must be non-negative integers' });
      }
      values[key] = value;
    }
    const recordedAt = req.body.recorded_at || new Date().toISOString().slice(0, 10);
    if (!validDate(recordedAt)) return res.status(422).json({ message: 'Metric recording date is invalid' });
    const [id] = await db('content_metrics').insert({ content_id: content.id, recorded_at: recordedAt, ...values });
    res.status(201).json(await db('content_metrics').where({ id }).first());
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listContents,
  getContent,
  createContent,
  updateContent,
  deleteContent,
  replaceChecklists,
  createMetricSnapshot,
};
