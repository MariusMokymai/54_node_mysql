require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const postsRouter = require('./routes/postsRoutes');
const categoriesRouter = require('./routes/categoryRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello World!');
});

// import routers
app.use('/', postsRouter);
app.use('/', categoriesRouter);
app.use('/', authRouter);

// musu errro handling
app.use((err, req, res, next) => {
  console.log('<<<<musu errror handling>>>>>');

  console.log('err ===', err);

  if (err.status && err.status === 404) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err.errno === 1146) {
    return res.status(400).json({
      error: err.sqlMessage || 'no such table',
    });
  }

  res.status(500);
  res.json('Server error (musu errror handling)');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
