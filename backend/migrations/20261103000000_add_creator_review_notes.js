exports.up = function (knex) {
  return knex.schema.alterTable('contents', (table) => {
    table.text('creator_review_notes').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('contents', (table) => {
    table.dropColumn('creator_review_notes');
  });
};
