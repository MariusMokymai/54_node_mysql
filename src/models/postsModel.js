const { getSqlData } = require('../helper');

module.exports.getAllPosts = () => {
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
  GROUP BY posts.post_id
  `;

  return getSqlData(sql);
};
