const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router');
const session = require("express-session");
const Store = require('connect-session-knex')(session)

const knex = require('../data/db-config')

const server = express();
server.use(express.json());

server.use(session({
  name: 'chocolatechip',
  secret: 'nevertell',
  saveUninitialized: false,
  resave: false,
  store: new Store({
    knex,
    createTable: true,
    clearInterval: 1000 * 60 * 10,
    tablename: 'sessions',
    sidfieldname: 'sid'
  }),
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  }
}))

server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)

server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.get('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found'
  })
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
