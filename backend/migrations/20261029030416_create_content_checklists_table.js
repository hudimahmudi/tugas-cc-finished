exports.up = function (knex) {
  return knex.schema.createTable('content_checklists', (table) => {
    table.bigIncrements('id').primary();
    table
      .bigInteger('content_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('contents')
      .onDelete('CASCADE');
    table.string('task_name', 255).notNullable();
    table.boolean('is_completed').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('content_checklists');
};