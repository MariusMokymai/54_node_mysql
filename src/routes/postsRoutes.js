// sukurti routeri
const express = require('express');
const { authorizeToken, validatePostBody } = require('../middleware');

const postsController = require('../controllers/postsController');

const postsRouter = express.Router();

// GET /api/posts - get all posts
// SELECT * FROM `posts`
postsRouter.get('/api/posts', authorizeToken, postsController.getAll);

// GET /api/posts/2 - get post su id 2
postsRouter.get('/api/posts/:postId', authorizeToken, postsController.getSingle);

// DELETE /api/posts/2 - get post su id 2
postsRouter.delete('/api/posts/:postId', authorizeToken, postsController.delete);

// POST /api/posts - sukurtu nauja posta
postsRouter.post('/api/posts', authorizeToken, validatePostBody, postsController.create);
// exportuot

module.exports = postsRouter;
// importuot i server
