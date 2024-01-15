const { getSqlData } = require('../helper');

// GET /api/comments/postId/1 - grazins visus komentarus kurie yra po post kurio id 1
module.exports.getPostComments = async (req, res, next) => {
  const { postId } = req.params;

  const sql = 'SELECT * FROM `post_comments` WHERE `post_id`=?';

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

  const argArr = [author, comment, postId];

  const sql = 'INSERT INTO `post_comments` (`author`, `comment`, `post_id`) VALUES (?, ?, ?)';

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
