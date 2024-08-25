/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { seed: seedRoles } = require('./seed_roles');
const { seed: seedUsers } = require('./seed_users');
const { seed: seedBooks } = require('./seed_books');

exports.seed = async function(knex) {
  await seedRoles(knex);
  await seedUsers(knex);
  await seedBooks(knex);
};
