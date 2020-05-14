const express = require('express');
const Users = require('../users/userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

// CREATE NEW USER /api/users
router.post('/', validateUser, (req, res) => {
  const userData = req.body;

  Users
      .insert(userData)
      .then(user => res.status(200).json(user))
      .catch(() => res.status(500).json({
        message: "Error creating a new user to the database"
      }))
});

// CREATE USER POST by ID /api/users/:id/posts
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const postData = req.body;

  Posts
    .insert(postData)
    .then(post => res.status(200).json(post))
    .catch(() => res.status(500).json({
      message: "Error adding the new post to the database"
    }))
});

// GET USERS /api/users
router.get('/', (req, res) => {
  Users
    .get()
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).json({
      message: "Error retrieving users from the database"
    }))
});

// GET USER by ID /api/users/:id
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

// GET USER POSTS by ID /api/users/:id/posts
router.get('/:id/posts', validateUserId, (req, res) => {
  const user = req.user;

  Users
    .getUserPosts(user.id)
    .then(posts => res.status(200).json(posts))
    .catch(() => res.status(500).json({
      message: "Error retrieving user's posts from the database"
    }))
});

// DELETE USER by ID /api/users/:id
router.delete('/:id', validateUserId, (req, res) => {
  const user = req.user;

  Users
    .remove(user.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: "Account successfully deleted",
          user
        });
      }
    })
    .catch(() => res.status(500).json({
      message: "Error deleting user from the database"
    }))
});

// UPDATE USER by ID /api/users/:id
router.put('/:id', validateUserId, validateUser, (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  Users
    .update(id, updateData)
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(() => res.status(500).json({
      message: "Error retrieving the user's info from the database"
    }))
});

// --- Custom Middleware --- //

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        return next();
      }
      res.status(400).json({
        message: "Invalid user ID"
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Error retrieving the user"
      });
    });
}

function validateUser(req, res, next) {
  const body = req.body;

  if (!body) {
    res.status(400).json({
      message: "Missing user data"
    });
  } else if (!body.name) {
    res.status(400).json({
      message: "Missing required name field"
    })
  }
  next()
}

function validatePost(req, res, next) {
  const body = req.body;

  if (!body) {
    res.status(400).json({
      message: "Missing post data"
    })
  } else if (!body.text) {
    res.status(400).json({
      message: "Missing required text field"
    })
  }
  next()
}

module.exports = router;
