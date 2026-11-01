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
    },
  ];

  for (const content of demoContents) {
    const existing = await knex('contents').where({ user_id: user.id, title: content.title }).first();
    if (!existing) await knex('contents').insert({ ...content, user_id: user.id });
  }
};