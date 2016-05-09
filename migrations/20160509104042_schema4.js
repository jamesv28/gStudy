
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(table) {
     table.increments();
      table.integer('deck_id');
      table.foreign('deck_id').references('id').inTable('decks');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games')
};
