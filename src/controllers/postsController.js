const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');
const { getSqlData } = require('../helper');

const postModel = require('../models/postsModel');

module.exports.getAll = async (req, res, next) => {
  // const sql = 'SELECT * FROM posts';
  // const sql = `
  // SELECT posts.post_id, posts.title, posts.author, posts.content, posts.date, COUNT(post_comments.comm_id) AS commentCount,
  // categories.title AS categoryName
  // FROM posts
  // JOIN categories
  // ON posts.cat_id=categories.cat_id
  // LEFT JOIN post_comments
  // ON post_comments.post_id=posts.post_id
  // GROUP BY posts.post_id
  // `;

  const [postsArr, error] = await postModel.getAllPosts();

  if (error) return next(error);

  res.json(postsArr);
};
module.exports.getSingle = async (req, res, next) => {
  const { postId } = req.params;

  // ar autorizuotas?

  const sql = `
  SELECT posts.post_id, posts.title, posts.author, users.email AS userEmail, posts.content, posts.date, COUNT(post_comments.comm_id) AS commentCount,
  categories.title AS categoryName
  FROM posts
  JOIN categories
  ON posts.cat_id=categories.cat_id
  LEFT JOIN post_comments
  ON post_comments.post_id=posts.post_id
  LEFT JOIN users
  ON users.id=posts.user_id
  WHERE posts.post_id=?
  GROUP BY posts.post_id
  `;
  // await getSqlData(sql, [postId]);
  const [postsArr, error] = await getSqlData(sql, [postId]);

  if (error) return next(error);

  if (postsArr.length === 1) {
    res.json(postsArr[0]);
    return;
  }
  if (postsArr.length === 0) {
    // res.status(404).json({ msg: 'post not found' });
    next({ message: 'posts not found', status: 404 });
    return;
  }

  // radom daugiau nei viena, neradom nei vieno
  res.status(400).json(postsArr);
};
module.exports.delete = async (req, res, next) => {
  const { postId } = req.params;
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    // isitikinti kad posto autorius yra tas kuris nori istrinti
    const sql1 = 'SELECT * FROM posts WHERE post_id=?';
    const [rows1] = await conn.execute(sql1, [postId]);

    if (+rows1[0].user_id !== +req.userId) {
      next({ status: 401, message: 'Not allowed' });
      return;
    }

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
    console.warn('DELETE FROM posts error');
    // res.status(500).json('something wrong');
    next(error);
  } finally {
    // atsijungiam
    if (conn) conn.end();
    // conn?.end();
  }
};
module.exports.create = async (req, res, next) => {
  console.log('req.body ===', req.body);
  const { title, author, date, content, cat_id: catId } = req.body;
  const { userId } = req;

  // validation

  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO posts (title, author, date, content, cat_id, user_id) 
    VALUES (?,?,?,?,?,?)
    `;
    const [rowOb] = await conn.execute(sql, [title, author, date, content, catId, userId]);
    res.status(201).json(rowOb);
  } catch (error) {
    console.warn('INSERT INTO posts err');
    next(error);
  } finally {
    // atsijungiam
    if (conn) conn.end();
    // conn?.end();
  }
};

// module.exports = {
//   getAll,
//   getSingle,
//   deletePost,
//   create,
// };
