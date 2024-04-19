const jwt = require('jsonwebtoken');
exports.generateToken = async(res, userId) => {
    try {
        const token = jwt.sign({ userId }, 'abc123', {
            expiresIn: '30d',
          });
        if(token){
            res.cookie('jwt', token, {
                httpOnly: true,
                secure:false, // Use secure cookies in production
              sameSite: 'strict', // Prevent CSRF attacks
             maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days Prevent CSRF attacks
            });
        }          
      
    } catch (error) {
        console.log(error)
    }  
  
}