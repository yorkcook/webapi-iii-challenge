const express = "express";

const router = require("express").Router();

let User = require("./userDb.js");

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  User.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "You have been denied the user list!" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    User.getById(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res.status(500).json({ message: "User retrieval failed!" });
      });
  } else {
    res.status(404).json({ message: "No user exists with that id!" });
  }
});

router.get("/:id/posts", (req, res) => {
  const id = req.params.id;
  if (id) {
    User.getUserPosts(id)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        res.status(500).json({ message: "Oh no! Can't retrieve the posts!" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  //if (id) {
  User.remove(id)
    .then(user => {
      res.status(200).json({ message: "User has been eliminated." });
    })
    .catch(user => {
      res.status(500).json({ error: "You can not perform that elimination!" });
    });
  //}
});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
