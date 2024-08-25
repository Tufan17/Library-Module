exports.up = async function(knex) {
  await knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
    table.integer('role_id').unsigned().notNullable();
    table.foreign('role_id').references('id').inTable('roles');
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('users');
};
