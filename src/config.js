const dbConfig = {
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('generateJwtToken no secret');

// console.log('jwtSecret ===', jwtSecret);
// console.log('dbConfig ===', dbConfig);

module.exports = {
  dbConfig,
  jwtSecret,
};
