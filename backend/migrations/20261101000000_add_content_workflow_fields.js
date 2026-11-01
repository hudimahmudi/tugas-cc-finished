exports.up = function (knex) {
  return knex.schema.alterTable('contents', (table) => {
    table.boolean('ready_approved').notNullable().defaultTo(false);
    table.boolean('creator_approved').notNullable().defaultTo(false);
    table.string('draft_file_name', 255).nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('contents', (table) => {
    table.dropColumn('ready_approved');
    table.dropColumn('creator_approved');
    table.dropColumn('draft_file_name');
  });
};
