const express = require('express');
const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  Posts
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(() => res.status(500).json({
      message: "Error retrieving posts from the database"
    }))
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.body;

  Posts
    .getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        return next()
      }
      res.status(400).json({
        message: "Invalid post ID"
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
}

module.exports = router;
