exports.up = function (knex) {
  return knex.schema.createTable('content_metrics', (table) => {
    table.bigIncrements('id').primary();
    table
      .bigInteger('content_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('contents')
      .onDelete('CASCADE');
    table.date('recorded_at').notNullable();
    table.integer('views_count').notNullable().defaultTo(0);
    table.integer('likes_count').notNullable().defaultTo(0);
    table.integer('comments_count').notNullable().defaultTo(0);
    table.integer('shares_count').notNullable().defaultTo(0);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('content_metrics');
};