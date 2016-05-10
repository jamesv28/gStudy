
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('decks').del(),

    // Inserts seed entries
    knex('decks').insert(
        {
            id: 1,
            name: 'basic',
            description: 'a lot of simple questions',
            users_id: 1
        })

  );
};
