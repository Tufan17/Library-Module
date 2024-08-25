exports.up = async function(knex) {
  await knex.schema.createTable('roles', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('roles');
};
