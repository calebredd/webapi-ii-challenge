const express = require("express");
const router = express.Router();
const Posts = require("../data/db");
router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() =>
      res.status(500).send({ errorMessage: "Error Accessing Posts" })
    );
});
router.get("/:postId/comments", (req, res) => {
  Posts.findPostComments(req.params.postId)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() =>
      res.status(500).send({ errorMessage: "Error Accessing Comments" })
    );
});
router.get("/:postId/comments/:commentId", (req, res) => {
  Posts.findCommentById(req.params.commentId)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() =>
      res.status(500).send({ errorMessage: "Error Accessing Comments" })
    );
});
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(() => res.status(500).send({ errorMessage: "Error Finding Post" }));
});
router.post("/", (req, res) => {
  // const newPost={title:"New Post",contents:"Guess who said this"}
  const newPost = { title: req.body.title, contents: req.body.contents };
  Posts.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(() => res.status(500).send({ errorMessage: "Error Creating Post" }));
});
router.post("/:postId/comments/", (req, res) => {
  // const newPost={title:"New Post",contents:"Guess who said this"}
  const newComment = { text: req.body.text, post_id: req.params.postId };
  Posts.insert(newComment)
    .then(comment => {
      res.status(201).json(comment);
    })
    .catch(() =>
      res.status(500).send({ errorMessage: "Error Creating Comment" })
    );
});
router.put("/:id", (req, res) => {
  // const newPost={title:"New Post",contents:"Guess who said this"}
  const editPost = { title: req.body.title, contents: req.body.contents };
  Posts.update(req.params.id, editPost)
    .then(post => {
      res.status(202).json(post);
    })
    .catch(() => res.status(500).send({ errorMessage: "Error Updating Post" }));
});
router.delete("/:id", (req, res) => {
  // const newPost={title:"New Post",contents:"Guess who said this"}
  Posts.remove(req.params.id)
    .then(post => {
      res.status(202).json(post);
    })
    .catch(() => res.status(500).send({ errorMessage: "Error Removing Post" }));
});

module.exports = router;
