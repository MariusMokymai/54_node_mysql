const express = require('express');

const authController = require('../controllers/authController');

const authRouter = express.Router();

// routes
// POST /api/auth/login - priloginti vartotoja
authRouter.post('/api/auth/login', authController.login);

authRouter.post('/api/auth/register', authController.register);

module.exports = authRouter;
