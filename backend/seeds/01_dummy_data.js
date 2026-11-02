const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  let user = await knex('users').where({ email: 'creator@example.com' }).first();
  if (!user) {
    const passwordHash = await bcrypt.hash('password123', 10);
    const [userId] = await knex('users').insert({
      name: 'Kreator Demo',
      email: 'creator@example.com',
      password_hash: passwordHash,
      role: 'creator',
    });
    user = await knex('users').where({ id: userId }).first();
  }

  let editor = await knex('users').where({ email: 'editor@example.com' }).first();
  if (!editor) {
    const passwordHash = await bcrypt.hash('password123', 10);
    const [editorId] = await knex('users').insert({
      name: 'Editor Demo',
      email: 'editor@example.com',
      password_hash: passwordHash,
      role: 'editor',
    });
    editor = await knex('users').where({ id: editorId }).first();
  }
  if (editor.role !== 'editor') editor = null;

  async function getOrCreateChannel(platform, handleName) {
    let channel = await knex('channels').where({
      user_id: user.id,
      platform,
      handle_name: handleName,
    }).first();
    if (!channel) {
      const [id] = await knex('channels').insert({
        user_id: user.id,
        platform,
        handle_name: handleName,
      });
      channel = await knex('channels').where({ id }).first();
    }
    return channel.id;
  }

  const channelYoutube = await getOrCreateChannel('youtube', '@techcreator');
  const channelTiktok = await getOrCreateChannel('tiktok', '@techcreator');
  const scheduledDate = new Date().toISOString().slice(0, 10);
  const demoContents = [
    {
      channel_id: channelYoutube,
      title: 'Tutorial Express untuk pemula',
      description: 'Membuat REST API pertama dengan Express',
      format_type: 'long_video',
      status: 'idea',
      priority: 'high',
    },
    {
      channel_id: channelTiktok,
      title: 'Tips Git untuk tim',
      description: 'Tiga perintah Git yang sering dipakai',
      format_type: 'short_video',
      status: 'scripting',
      priority: 'medium',
    },
    {
      channel_id: channelYoutube,
      title: 'Review hasil editing',
      description: 'Contoh konten yang sudah masuk tahap editing',
      format_type: 'long_video',
      status: 'editing',
      priority: 'low',
      script_draft: 'Opening hook, core points, and closing call to action.',
      scheduled_date: scheduledDate,
    },
  ];

  for (const content of demoContents) {
    const existing = await knex('contents').where({ user_id: user.id, title: content.title }).first();
    if (!existing) {
      await knex('contents').insert({
        ...content,
        user_id: user.id,
        assigned_editor_id: editor?.id || null,
      });
    } else {
      const missingDetails = {};
      if (editor && existing.assigned_editor_id == null) missingDetails.assigned_editor_id = editor.id;
      if (content.script_draft && existing.script_draft == null) missingDetails.script_draft = content.script_draft;
      if (content.scheduled_date && existing.scheduled_date == null) missingDetails.scheduled_date = content.scheduled_date;
      if (Object.keys(missingDetails).length) {
        await knex('contents').where({ id: existing.id }).update(missingDetails);
      }
    }
  }
};