const express = require('express');
const { getSqlData } = require('../helper');

const authRouter = express.Router();

// routes
// POST /api/auth/login - priloginti vartotoja
authRouter.post('/api/auth/login', async (req, res) => {
  // pasiimti email, password is req.body
  const { email, password } = req.body;
  // paieskoti ar yra vartotojas tokiu email
  const sql = 'SELECT * FROM `users` WHERE `email`= ?';
  const [usersArr, error] = await getSqlData(sql, [email]);

  if (error) {
    res.status(500).json('server error');
    return;
  }
  console.log('usersArr ===', usersArr);
  // neradom - pranesam kad email not found
  if (usersArr.length === 0) {
    res.status(400).json('email not found');
    return;
  }

  // radom - palyginti ar surasto objekto slaptazodziai sutampa
  const foundUser = usersArr[0];
  if (foundUser.password !== password) {
    // jei nesutampa - 'email or passwod do not match 400'

    return;
  }

  // jei sutampa - 200 successfull login

  res.json('login success');
});

module.exports = authRouter;
