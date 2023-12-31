const express = require('express');
const bcrypt = require('bcryptjs');

const { getSqlData, makeJWTToken } = require('../helper');

const authRouter = express.Router();

// routes
// POST /api/auth/login - priloginti vartotoja
authRouter.post('/api/auth/login', async (req, res, next) => {
  // pasiimti email, password is req.body
  const { email, password: plainPassword } = req.body;
  // paieskoti ar yra vartotojas tokiu email
  const sql = 'SELECT * FROM `users` WHERE `email`= ?';
  const [usersArr, error] = await getSqlData(sql, [email]);

  if (error) return next(error);

  console.log('usersArr ===', usersArr);
  // neradom - pranesam kad email not found
  if (usersArr.length === 0) {
    res.status(400).json('email not found');
    return;
  }

  // radom - palyginti ar surasto objekto slaptazodziai sutampa
  const foundUser = usersArr[0];
  if (!bcrypt.compareSync(plainPassword, foundUser.password)) {
    // jei nesutampa - 'email or passwod do not match 400'
    next({ message: 'email or passwod do not match', status: 400 });
    return;
  }

  // sugeneruoti token
  const payload = { email, sub: foundUser.id };
  const token = makeJWTToken(payload);
  // const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

  // jei sutampa - 200 successfull login

  res.json({
    msg: 'Login success',
    token,
  });
});

authRouter.post('/api/auth/register', async (req, res, next) => {
  const { email, password } = req.body;
  console.log('req.body ===', req.body);
  // hash slaptazodis
  const hashPassword = bcrypt.hashSync(password, 10);
  const sql = 'INSERT INTO users (email, password) VALUES (?,?)';
  const [rezObj, error] = await getSqlData(sql, [email, hashPassword]);

  if (error) return next(error);

  res.status(201).json(rezObj);
});

module.exports = authRouter;
