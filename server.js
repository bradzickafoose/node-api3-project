const express = require('express');
const helmet = require('helmet');

const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')

const server = express();

// middleware

server.use(helmet());
server.use(express.json());
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to `)
}

module.exports = server;
