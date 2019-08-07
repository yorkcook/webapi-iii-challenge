// code away!

const express = require("express");

const server = express();

const userRouter = require("./users/userRouter");

const helmet = require("helmet");

server.use(express.json());

server.use("/", userRouter);

server.listen(4000, () => {
  console.log("Server reporting for duty from port 4000!");
});
