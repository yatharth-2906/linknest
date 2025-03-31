const path = require('path');
require('dotenv').config({ path: './.env' });

const cors = require('cors');
const express = require('express');
const connectToMongoDB = require('./connect');

const cookieParser = require('cookie-parser');
const logger = require('./middlewares/logger');

const staticRouter = require('./routes/static')
const userRouter = require('./routes/user');

const app = express();
const PORT = parseInt(process.env.PORT) || 8421;

connectToMongoDB();

const allowedOrigins = ['https://linknest-frontend.vercel.app', 'http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

// app.use(logger); 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use('/', staticRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}....`);
});