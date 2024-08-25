/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const faker = require('@faker-js/faker');

exports.seed = async function(knex) {
  await knex("users").del();

  const hashedPassword = "e10adc3949ba59abbe56e057f20f883e";

  await knex("users").insert([
    {
      name: 'Admin',
      email: 'admin@library.com',
      password: hashedPassword,
      role_id: 1
    }
  ]);

  const users = Array.from({ length: 100 }, () => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: hashedPassword,
    role_id: 2
  }));

  await knex("users").insert(users);
};
