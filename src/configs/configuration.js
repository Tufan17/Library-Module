const express = require("express");
const { resolve } = require("node:path");
const expressSession = require("express-session");

const sessionStore = require('connect-session-knex')(expressSession);

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(resolve("dist"), { index: false, cacheControl: true }));
  const ONE_DAY = 1 * 24 * 60 * 60 * 1000; 
  app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "eticaret-secret",
    store: new sessionStore({
      knex: require("./../database/connection"),
      tablename: "sessions",
      createtable: true,
    }),
    cookie: {
      maxAge: ONE_DAY, 
      secure: false, 
      httpOnly: true,
     }
  }))
};


