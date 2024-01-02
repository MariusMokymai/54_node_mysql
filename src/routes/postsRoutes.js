// sukurti routeri
const express = require('express');
const mysql = require('mysql2/promise');
const { getSqlData } = require('../helper');
const { dbConfig } = require('../config');

const postsRouter = express.Router();

// GET /api/posts - get all posts
// SELECT * FROM `posts`
postsRouter.get('/api/posts', async (req, res) => {
  const sql = 'SELECT * FROM posts';

  const [postsArr, error] = await getSqlData(sql);

  if (error) {
    // euston we have a proplem
    console.log('error ===', error);
    res.status(500).json('something wrong');
    return;
  }
  res.json(postsArr);
});

// GET /api/posts/2 - get post su id 2
postsRouter.get('/api/posts/:postId', async (req, res) => {
  const { postId } = req.params;

  const sql = 'SELECT * FROM posts WHERE post_id=?';
  const [postsArr, error] = await getSqlData(sql, [postId]);

  if (error) {
    // euston we have a proplem
    console.log('error ===', error);
    res.status(500).json('something wrong');
    return;
  }

  if (postsArr.length === 1) {
    res.json(postsArr[0]);
    return;
  }
  if (postsArr.length === 0) {
    res.status(404).json({ msg: 'post not found' });
    return;
  }

  // radom daugiau nei viena, neradom nei vieno
  res.status(400).json(postsArr);
});

// DELETE /api/posts/2 - get post su id 2
postsRouter.delete('/api/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'DELETE FROM posts WHERE post_id=? LIMIT 1';
    const [rows] = await conn.execute(sql, [postId]);
    console.log('rows ===', rows);
    // pavyko istrinti jei
    if (rows.affectedRows === 1) {
      res.json({ msg: `post with id ${postId} was deleted` });
      return;
    }
    // rows.affectedRows !== 1
    res.status(400).json({
      msg: 'no rows afected',
      rows,
    });
  } catch (error) {
    console.warn('single post err', error);
    res.status(500).json('something wrong');
  } finally {
    // atsijungiam
    if (conn) conn.end();
    // conn?.end();
  }
});

// POST /api/posts - sukurtu nauja posta
postsRouter.post('/api/posts', async (req, res) => {
  console.log('req.body ===', req.body);
  const { title, author, date, content, cat_id: catId } = req.body;

  // validation

  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO posts (title, author, date, content, cat_id) 
    VALUES (?,?,?,?,?)
    `;
    const [rowOb] = await conn.execute(sql, [
      title,
      author,
      date,
      content,
      catId,
    ]);
    res.status(201).json(rowOb);
  } catch (error) {
    console.warn('single post err', error);
    res.status(500).json('something wrong');
  } finally {
    // atsijungiam
    if (conn) conn.end();
    // conn?.end();
  }
});
// exportuot

module.exports = postsRouter;
// importuot i server
