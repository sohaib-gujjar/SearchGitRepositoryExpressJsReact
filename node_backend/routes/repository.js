var express = require('express');
var router = express.Router();
var repo = require('../src/services/github_repository.service');

//import GithubRepository from "../src/services/github_repository.service";

// middleware for all
/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
});

// middleware for GET all repositories
router.use('/:txt', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
});

/* GET all repositories. */
router.get('/get/:txt', function (req, res, next) {
  repo.githubRepository(req.params.txt, (result) => {
    res.send(result)
  });
})

/* GET all bookmarked repositories. */
router.get('/bookmark', function (req, res, next) {
  repo.getAllBookmarkedRepositories((result) => {
    res.send(result)
  });
})

/* Bookmark repository. */
router.post('/bookmark/:id', function (req, res) {
  repo.createBookmark(req.params.id, req.body, (result) => {
    res.send(result)
  }, (error) => {
    res.status(500).send(error)
  });
});

/* Bookmark repository. */
router.delete('/bookmark/:id', function (req, res) {
  repo.reomoveBookmark(req.params.id, (result) => {
    res.send(result)
  }, (error) => {
    res.status(500).send(error)
  });
});

module.exports = router;
