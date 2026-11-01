exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.bigIncrements('id').primary();
    table.string('name', 100).notNullable();
    table.string('email', 191).notNullable().unique();
    table.string('password_hash', 255).notNullable();
    table.enu('role', ['creator', 'editor', 'admin']).notNullable().defaultTo('creator');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};