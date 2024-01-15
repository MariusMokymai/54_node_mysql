const express = require('express');

const categoryController = require('../controllers/categoryController');

const categoriesRouter = express.Router();

// routes
// GET /api/categories - visas kategorijas
categoriesRouter.get('/api/categories', categoryController.getAll);

module.exports = categoriesRouter;
