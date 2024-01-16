const { getSqlData } = require('../helper');

// GET /api/comments/postId/1 - grazins visus komentarus kurie yra po post kurio id 1
module.exports.getPostComments = async (req, res, next) => {
  const { postId } = req.params;

  const sql = `
  SELECT post_comments.comm_id, post_comments.author, post_comments.comment, post_comments.created_at, 
  post_comments.post_id, users.email AS userEmail
  FROM post_comments 
  JOIN users
  ON post_comments.user_id=users.id
  WHERE post_id=?
  `;

  const [commentsArr, error] = await getSqlData(sql, [postId]);

  if (error) {
    console.log('getPostComments error ===', error);
    next({ message: 'System error', status: 500 });
    return;
  }

  res.json(commentsArr);
};
// POST /api/comments/post/1 - sukurs nauja komentara po postu kurio id 1
module.exports.createComment = async (req, res, next) => {
  const { postId } = req.params;

  const { author, comment } = req.body;

  const { userId } = req;

  if (!userId) {
    res.sendStatus(401);
    return;
  }

  const argArr = [author, comment, postId, userId];

  const sql =
    'INSERT INTO `post_comments` (`author`, `comment`, `post_id`, user_id) VALUES (?, ?, ?, ?)';

  const [resultObj, error] = await getSqlData(sql, argArr);

  if (error) {
    console.log('createComment error ===', error);
    next('System error');
    return;
  }
  console.log('resultObj ===', resultObj);
  if (resultObj.affectedRows === 1) {
    res.status(201).json({ msg: 'success', comm_id: resultObj.insertId });
    return;
  }

  next(resultObj);
};
