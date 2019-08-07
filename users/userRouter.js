const express = "express";

const router = require("express").Router();

let User = require("./userDb.js");

let Post = require("../posts/postDb");

router.post("/", (req, res) => {
  const user = req.body;
  if (user.name) {
    User.insert(user)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "Error when trying to add the homie." });
      });
  } else {
    res.status(400).json({ message: "We need a name to add the homie." });
  }
});

router.post("/:id/posts", (req, res) => {
  const post = req.body;
  if (post) {
    Post.insert(post)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        res.status(500).json({ message: "Error when trying to add the post." });
      });
  } else {
    res.status(400).json({ message: "We need text to add to the homie." });
  }
});

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

  if (id) {
    User.remove(id)
      .then(user => {
        res.status(200).json({ message: "User has been eliminated." });
      })
      .catch(user => {
        res
          .status(500)
          .json({ error: "You can not perform that elimination!" });
      });
  } else {
    res.status(404).json({ message: "No user exists with that id." });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const update = req.body;

  if (update.name) {
    User.update(id, update)
      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({ message: "No user exists with that id." });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "The user could not be modified." });
      });
  } else {
    res.status(400).json({ error: "Please provide name." });
  }
});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
