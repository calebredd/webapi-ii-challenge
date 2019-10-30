const express = require("express");
const router = express.Router();
const Posts = require("../data/db");
router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json({posts});
    })
    .catch(() =>
      res.status(500).send({ errorMessage: "Error Accessing Posts" })
    );
});
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  // console.log(title);
  // console.log(contents);
  if (!title || !contents) {
    res.status(400).send("Unable to Post at this Time.");
  } else {
    Posts.insert({ title: title, contents: contents })
      .then(post => {
        res.status(201).json({post});
      })
      .catch(() =>
        res.status(500).send({ errorMessage: "Error Creating Post" })
      );
  }
});
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      res.status(200).json({post});
    })
    .catch(() => res.status(500).send({ errorMessage: "Error Finding Post" }));
});
router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  if (!title && !contents) {
    res.status(400).send("New Title and/or Contents not found");
  } else {
    Posts.update(req.params.id, { title: title, contents: contents })
      .then(post => {
        res.status(202).json({post});
      })
      .catch(() =>
        res.status(500).send({ errorMessage: "Error Updating Post" })
      );
  }
});
router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then(post => {
      res.status(202).json({post});
    })
    .catch(() => res.status(500).send({ errorMessage: "Error Removing Post" }));
});
router.get("/:postId/comments", (req, res) => {
  Posts.findPostComments(req.params.postId)
    .then(posts => {
      res.status(200).json({posts});
    })
    .catch(() =>
      res.status(500).send({ errorMessage: "Error Accessing Comments" })
    );
});
router.post("/:postId/comments/", (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).send("You must add text for your comment.");
  } else if (!req.params.postId) {
    res.status(400).send("No Post selected to comment on in the URL");
  } else {
    Posts.insertComment({ text: text, post_id: req.params.postId })
      .then(comment => {
        res.status(201).json({comment});
      })
      .catch(() =>
        res.status(500).send({ errorMessage: "Error Creating Comment" })
      );
  }
});
router.get("/:postId/comments/:commentId", (req, res) => {
  Posts.findCommentById(req.params.commentId)
    .then(posts => {
      res.status(200).json({posts});
    })
    .catch(() =>
      res.status(500).send({ errorMessage: "Error Accessing Comments" })
    );
});

module.exports = router;
