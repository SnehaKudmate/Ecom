const express = require('express');
const db = require('./config/db.js');
const productRoute = require('./routes/productRoutes.js');
const categoryRoute = require('./routes/categoryRoutes.js');
const brandRoute = require('./routes/brandRoutes.js');
const userRoute = require('./routes/userRoutes.js');
const authRoute = require('./routes/authRoutes.js');
const cartRoute = require('./routes/cartRoute.js');
const orderRoute = require('./routes/orderRoutes.js');
// const { User } = require('./models/UserModel.js');
// const session = require('express-session');
// const passport = require('passport');
const cors = require('cors');
 const cookieParser = require('cookie-parser');


db();
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));

server.use('/product/api', productRoute);
server.use('/category/api', categoryRoute);
server.use('/brand/api', brandRoute);
server.use('/user/api', userRoute);
server.use('/auth/api', authRoute);
server.use('/cart/api', cartRoute);
server.use('/order/api', orderRoute);


// Error handling middleware
server.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Custom error handling for invalid routes
server.use((req, res, next) => {
  const error = new Error('Not Found');
  error.statusCode = 404;
  next(error);
});

server.listen(8000, () => {
  console.log('Server started on port 8000');
});
