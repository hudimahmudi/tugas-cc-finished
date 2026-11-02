exports.up = function (knex) {
  return knex.schema.alterTable('contents', (table) => {
    table
      .bigInteger('assigned_editor_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.index(['assigned_editor_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('contents', (table) => {
    table.dropIndex(['assigned_editor_id']);
    table.dropColumn('assigned_editor_id');
  });
};
