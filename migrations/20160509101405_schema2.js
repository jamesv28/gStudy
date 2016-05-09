
exports.up = function(knex, Promise) {
  return knex.schema.createTable('decks', function(table) {
      table.increments();
      table.string('name');
      table.string('description');
      table.integer('users_id');
      table.foreign('users_id').references('id').inTable('users');
      
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('decks');
};
