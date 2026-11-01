exports.up = function (knex) {
  return knex.schema.createTable('channels', (table) => {
    table.bigIncrements('id').primary();
    table
      .bigInteger('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.enu('platform', ['youtube', 'tiktok', 'instagram', 'linkedin']).notNullable();
    table.string('handle_name', 100).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('channels');
};