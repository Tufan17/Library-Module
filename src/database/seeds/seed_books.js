/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');

exports.seed = async function(knex) {
  await knex('books').truncate();

  const books = Array.from({ length: 100 }, () => ({
    name: faker.lorem.words(3),
    point: '0.0',
    status: 'here'
  }));

  await knex('books').insert(books);
};
