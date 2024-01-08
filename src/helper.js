const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const { dbConfig, jwtSecret } = require('./config');

async function getSqlData(sql, argArr = []) {
  let connection;
  try {
    // prisijungiam
    connection = await mysql.createConnection(dbConfig);
    // atlikti veiksma
    const [rows] = await connection.execute(sql, argArr);
    return [rows, null];
  } catch (error) {
    // console.warn('getSqlData', error);
    return [null, error];
  } finally {
    // atsijungiam
    if (connection) connection.end();
    // connection?.end();
    console.log('after connection end');
  }
}
async function getSqlDataNoTry(sql, argArr = []) {
  const connection = await mysql.createConnection(dbConfig);

  const [rows] = await connection.execute(sql, argArr);
  if (connection) connection.end();
  return [rows, null];
}

function makeJWTToken(data) {
  return jwt.sign(data, jwtSecret, { expiresIn: '1h' });
}

module.exports = {
  getSqlData,
  getSqlDataNoTry,
  makeJWTToken,
};
