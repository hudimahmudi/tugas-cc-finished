exports.up = function (knex) {
  return knex.schema.createTable('contents', (table) => {
    table.bigIncrements('id').primary();
    table
      .bigInteger('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .bigInteger('channel_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('channels')
      .onDelete('RESTRICT');
    table.string('title', 255).notNullable();
    table.text('description').nullable();
    table.text('script_draft').nullable();
    table
      .enu('format_type', ['short_video', 'long_video', 'carousel', 'single_post'])
      .notNullable();
    table
      .enu('status', ['idea', 'scripting', 'recording', 'editing', 'ready', 'published'])
      .notNullable()
      .defaultTo('idea');
    table.enu('priority', ['low', 'medium', 'high']).notNullable().defaultTo('medium');
    table.date('scheduled_date').nullable();
    table.date('published_date').nullable();
    table.string('published_url', 255).nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.index(['status']);
    table.index(['channel_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('contents');
};