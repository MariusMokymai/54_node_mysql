const express = require('express');
const { getSqlData } = require('../helper');

const categoriesRouter = express.Router();

// routes
// GET /api/categories - visas kategorijas

categoriesRouter.get('/api/categories', async (req, res) => {
  const sql = 'SELECT * FROM `categories`';

  const [categoriesArr, error] = await getSqlData(sql);

  if (error) {
    // euston we have a proplem
    console.log('error ===', error);
    res.status(500).json('something wrong');
    return;
  }

  res.json(categoriesArr);
});

module.exports = categoriesRouter;
