
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cards', function(table) {
      table.increments();
      table.string('questions');
      table.string('answers');
      table.integer('deck_id');
      table.foreign('deck_id').references('id').inTable('decks')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cards');
};
