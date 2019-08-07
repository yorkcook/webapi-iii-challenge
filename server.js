const express = require("express");

const server = express();

const userRouter = require("./users/userRouter");

const helmet = require("helmet");

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const timestamp = Date.now();
  console.log(`You made a ${method} request to ${url} at ${timestamp}!`);
  next();
}

server.use(express.json());
server.use(logger);

server.use("/", userRouter);
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
