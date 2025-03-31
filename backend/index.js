const path = require('path');
require('dotenv').config({ path: './.env' });

const cors = require('cors');
const express = require('express');
const connectToMongoDB = require('./connect');

const cookieParser = require('cookie-parser');
const logger = require('./middlewares/logger');
const checkLoginStatus = require('./middlewares/checkLoginStatus');

const staticRouter = require('./routes/static')
const userRouter = require('./routes/user');

const app = express();
const PORT = parseInt(process.env.PORT) || 8421;

connectToMongoDB();

app.use(cors({
  origin: 'https://linknest-frontend.vercel.app',
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

// app.use(logger); 
app.use(express.json());
app.use(cookieParser());
app.use(checkLoginStatus);
app.use(express.urlencoded({extended:false}));

app.use('/', staticRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}....`);
});