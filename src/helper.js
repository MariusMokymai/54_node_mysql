const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');

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

// const [postsArr, error] = await getSqlData();

// if (error) {
//   // euston we have a proplem
// }

// console.log('postsArr ===', postsArr);

module.exports = {
  getSqlData,
  getSqlDataNoTry,
};
