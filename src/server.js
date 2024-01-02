require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
const { getSqlData } = require('./helper');

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello World!');
});

// GET /api/posts - get all posts
// SELECT * FROM `posts`
app.get('/api/posts', async (req, res) => {
  const sql = 'SELECT * FROM posts';

  const [postsArr, error] = await getSqlData(sql);

  if (error) {
    // euston we have a proplem
    console.log('error ===', error);
    res.status(500).json('something wrong');
    return;
  }

  console.log('postsArr ===', postsArr);
  res.json(postsArr);
  // let connection;
  // try {
  //   // prisijungiam
  //   connection = await mysql.createConnection(dbConfig);
  //   // atlikti veiksma
  //   const sql = 'SELECT * FROM posts';
  //   const [rows, fields] = await connection.query(sql);
  //   res.json(rows);
  // } catch (error) {
  //   console.warn('/api/posts', error);
  //   res.status(500).json('something wrong');
  // } finally {
  //   // atsijungiam
  //   if (connection) connection.end();
  //   // connection?.end();
  // }
  // console.log('after finnaly');
});

// GET /api/posts/2 - get post su id 2
app.get('/api/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM posts WHERE post_id=?';
    const [rows] = await conn.execute(sql, [postId]);
    // radom viena irasa
    if (rows.length === 1) {
      res.json(rows[0]);
      return;
    }
    // radom daugiau nei viena, neradom nei vieno
    res.status(400).json(rows);
  } catch (error) {
    console.warn('single post err', error);
    res.status(500).json('something wrong');
  } finally {
    // atsijungiam
    if (conn) conn.end();
    // conn?.end();
  }
});

// DELETE /api/posts/2 - get post su id 2
app.delete('/api/posts/:postId', async (req, res) => {
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
app.post('/api/posts', async (req, res) => {
  console.log('req.body ===', req.body);
  const { title, author, date, content } = req.body;

  // validation

  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO posts (title, author, date, content) 
    VALUES (?,?,?,?)
    `;
    const [rowOb] = await conn.execute(sql, [title, author, date, content]);
    res.json(rowOb);
  } catch (error) {
    console.warn('single post err', error);
    res.status(500).json('something wrong');
  } finally {
    // atsijungiam
    if (conn) conn.end();
    // conn?.end();
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
