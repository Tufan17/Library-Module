require("dotenv").config();
const connection = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST, //
    port: process.env.DB_PORT, // local mysql port
    user: process.env.DB_USER, // local mysql user
    password: process.env.DB_PASSWORD, // local mysql password
    database: process.env.DB_DATABASE, // local mysql database
  },
});
module.exports = connection;
