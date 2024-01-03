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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
