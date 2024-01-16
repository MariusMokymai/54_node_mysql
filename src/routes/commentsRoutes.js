const express = require('express');

const commentsRouter = express.Router();

const commentsController = require('../controllers/commentsController');
const { authorizeToken } = require('../middleware');

// routes

// GET /api/comments/post/1 - grazins visus komentarus kurie yra po post kurio id 1
commentsRouter.get('/api/comments/post/:postId', commentsController.getPostComments);

commentsRouter.post('/api/comments/post/:postId', authorizeToken, commentsController.createComment);

module.exports = commentsRouter;

// POST /api/comments/post/1 - sukurs nauja komentara po postu kurio id 1
