const express = require('express');
const Users = require('../users/userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const userData = req.body;

  Users.insert(userData)
      .then(user => res.status(200).json(user))
      .catch(() => res.status(500).json({
        message: 'Error creating a new user'
      }))
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
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
