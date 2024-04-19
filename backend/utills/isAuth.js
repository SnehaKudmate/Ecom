const jwt = require('jsonwebtoken')
const {User} = require('../models/UserModel')

exports.protect = async (req, res, next) => {  
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, 'abc123');    
     res.user = await User.findById(decoded.userId).select('-password');
   console.log("FFFF"+res.user);
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
}

