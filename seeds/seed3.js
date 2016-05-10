
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('cards').del(),

    // Inserts seed entries
    knex('cards').insert(
        {
          questions: 'how much does a woodchuck wood',
          answers: 'no idea',
          deck_id: 1
        }
    ),
      knex('cards').insert(
          {
            questions: 'what\s the color of orange',
            answers: 'orange',
            deck_id: 1
          }
      ),
      knex('cards').insert(
          {
            questions: 'Most underrated actor of all time',
            answers: 'Dolph Lundgren',
            deck_id: 1
          }
      ),
      knex('cards').insert(
          {
            questions: 'First comic Stan Lee worked on',
            answers: 'Captain America',
            deck_id: 1
          }
      )

  );
};
