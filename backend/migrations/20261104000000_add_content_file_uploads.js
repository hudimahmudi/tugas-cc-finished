exports.up = function (knex) {
  return knex.schema.alterTable('contents', (table) => {
    table.string('raw_file_name', 255).nullable();
    table.string('raw_file_path', 255).nullable();
    table.string('raw_file_mime', 100).nullable();
    table.integer('raw_file_size').unsigned().nullable();
    table.string('draft_file_path', 255).nullable();
    table.string('draft_file_mime', 100).nullable();
    table.integer('draft_file_size').unsigned().nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('contents', (table) => {
    table.dropColumn('raw_file_name');
    table.dropColumn('raw_file_path');
    table.dropColumn('raw_file_mime');
    table.dropColumn('raw_file_size');
    table.dropColumn('draft_file_path');
    table.dropColumn('draft_file_mime');
    table.dropColumn('draft_file_size');
  });
};
