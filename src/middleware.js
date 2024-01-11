const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');
// import { object, string, number, date, InferType } from 'yup';
const Yup = require('yup');

const Joi = require('joi');

function authorizeToken(req, res, next) {
  console.log('authorizeToken in progress');
  try {
    console.log('req.headers.authorization ===', req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('no token');
    const decoded = jwt.verify(token, jwtSecret);
    console.log('decoded ===', decoded);
    next();
  } catch (error) {
    console.log('error ===', error);
    res.status(401).json('unauthorized');
  }
}

async function validatePostBody(req, res, next) {
  console.log('req.body ===', req.body);
  const { title, author, date, content, cat_id: catId } = req.body;

  const postSchema = Yup.object({
    title: Yup.string().trim().min(3).required('Privalomas laukas'),
    author: Yup.string().trim().min(3).required(),
    date: Yup.date().min('1900-01-01').required('Privalomas laukas'),
    content: Yup.string().trim().min(5, 'Prasom placiau').required(),
    cat_id: Yup.number()
      .integer()
      .min(1, 'Bukite malonus pasirinkite kategorija')
      .required(),
  });

  try {
    const user = await postSchema.validate(req.body, { abortEarly: false });
    console.log('user ===', user);
    next();
  } catch (error) {
    console.log('error ===', error);
    const errFormatedObj = {};
    error.inner.forEach((eObj) => {
      errFormatedObj[eObj.path] = eObj.message;
      if (eObj.path === 'date') {
        errFormatedObj[eObj.path] = 'date is invalid';
      }
    });

    res.status(400).json(errFormatedObj);
  }
}

module.exports = {
  authorizeToken,
  validatePostBody,
};
