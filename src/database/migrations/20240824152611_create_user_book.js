exports.up = async function(knex) {
  await knex.schema.createTable('user_book', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('book_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users');
    table.foreign('book_id').references('id').inTable('books');
    table.enu('point', [1, 2, 3, 4, 5]).nullable();
    table.integer('created_by').unsigned().notNullable();
    table.foreign('created_by').references('id').inTable('users');
    table.enu('status', ['delivered', 'borrowed']).defaultTo('borrowed');
    table.timestamp('deleted_at').nullable();
    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('user_book');
};
