const db = require('../config/db');

function applyContentAccess(query, user, knex = db) {
  if (user.role === 'admin') return query;
  if (user.role === 'creator') return query.where('contents.user_id', user.id);
  if (user.role === 'editor') {
    return query.whereIn(
      'contents.user_id',
      knex('users').select('id').where({ role: 'creator' }),
    );
  }
  return query.whereRaw('1 = 0');
}

function applyChannelAccess(query, user, knex = db) {
  if (user.role === 'admin') return query;
  if (user.role === 'creator') return query.where('channels.user_id', user.id);
  if (user.role === 'editor') {
    return query.whereIn(
      'channels.user_id',
      knex('users').select('id').where({ role: 'creator' }),
    );
  }
  return query.whereRaw('1 = 0');
}

async function findAccessibleContent(user, contentId, knex = db) {
  return applyContentAccess(
    knex('contents').join('users as content_owner', 'contents.user_id', 'content_owner.id'),
    user,
    knex,
  )
    .where('contents.id', contentId)
    .first('contents.*', 'content_owner.name as owner_name');
}

module.exports = { applyContentAccess, applyChannelAccess, findAccessibleContent };
