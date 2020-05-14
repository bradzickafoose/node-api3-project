const express = require('express');
const Users = require('../users/userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const userData = req.body;

  Users
      .insert(userData)
      .then(user => res.status(200).json(user))
      .catch(() => res.status(500).json({
        message: "Error creating a new user to the database"
      }))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const postData = req.body;

  Posts
    .insert(postData)
    .then(post => res.status(200).json(post))
    .catch(() => res.status(500).json({
      message: "Error adding a new post to the database"
    }))
});

router.get('/', (req, res) => {
  Users
    .get()
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).json({
      message: "Error retrieving users from the database"
    }))
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res) => {
  const user = req.user;

  Users
    .getUserPosts(user.id)
    .then(posts => res.status(200).json(posts))
    .catch(() => res.status(500).json({
      message: "Error retrieving user's posts from the database"
    }))
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

  getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        return next();
      }

      res
        .status(400)
        .json({ message: "invalid user id" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "error retrieving the user" });
    });
}

function validateUser(req, res, next) {
  const body = req.body;

  if (!body) {
    res
      .status(400)
      .json({ message: 'missing user data' });
  } else if (!body.name) {
    res
      .status(400)
      .json({ message: 'missing required name field' })
  }
  next()
}

function validatePost(req, res, next) {
  const body = req.body;

  if (!body) {
    res
      .status(400)
      .json({ message: 'missing post data' })
  } else if (!body.text) {
    res
      .status(400)
      .json({ message: 'missing required text field' })
  }
  next()

}

module.exports = router;
