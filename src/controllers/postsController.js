const { getSqlData } = require('../helper');

module.exports.getAll = async (req, res, next) => {
  // const sql = 'SELECT * FROM posts';
  const sql = `
  SELECT posts.post_id, posts.title, posts.author, posts.content, posts.date, COUNT(post_comments.comm_id) AS commentCount,
  categories.title AS categoryName
  FROM posts
  JOIN categories
  ON posts.cat_id=categories.cat_id
  LEFT JOIN post_comments
  ON post_comments.post_id=posts.post_id
  GROUP BY posts.post_id
  `;

  const [postsArr, error] = await getSqlData(sql);

  if (error) return next(error);

  res.json(postsArr);
};
module.exports.getSingle = () => {};
module.exports.delete = () => {};
module.exports.create = () => {};

// module.exports = {
//   getAll,
//   getSingle,
//   deletePost,
//   create,
// };
