exports.up = function (knex) {
  return knex.schema.alterTable('contents', (table) => {
    table.string('draft_url', 255).nullable();
    table.text('review_notes').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('contents', (table) => {
    table.dropColumn('draft_url');
    table.dropColumn('review_notes');
  });
};
