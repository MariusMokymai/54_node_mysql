require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello World!');
});

// GET /api/posts - get all posts
// SELECT * FROM `posts`
app.get('/api/posts', async (req, res) => {
  try {
    // prisijungiam
    const connection = await mysql.createConnection({
      database: 'bit_main',
      host: 'localhost',
      user: 'root',
      password: '',
    });
    // atlikti veiksma
    const [rows, fields] = await connection.query('SELECT * FROM `posts`');
    res.json(rows);
    // atsijungiam
    connection.end();
  } catch (error) {
    console.warn('/api/posts', error);
    res.status(500).json('something wrong');
  }
});

// GET /api/posts/2 - get post su id 2

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
