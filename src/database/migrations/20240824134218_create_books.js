exports.up = async function(knex) {
  await knex.schema.createTable('books', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('point').notNullable();
    table.enu('status', ['here', 'borrowing']).defaultTo('borrowing');
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('books');
};
