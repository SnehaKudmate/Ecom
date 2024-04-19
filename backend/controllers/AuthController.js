const { User } = require("../models/UserModel.js");
const errorHandler = require("../utills/error.js");
const {generateToken} = require('../utills/generateToken.js')

const createUser = async (req, res,next) => {
    try {
        const user = await User.create(req.body);
        console.log(user)
        if(user){
           await generateToken(res, user._id);
           const { password: pass, ...rest } = user._doc;
           res.status(201).json(rest);
        }      
       
    } catch (error) {
        console.log(error)
    }
}

const checkUser = (req, res) => {
   console.log(res.user)
}

const loginUser = async(req, res,next) => {
    try {
       const {email, password} = req.body;    
        const user = await User.findOne({email});  
        if(user && (await user.matchPassword(password))){
            generateToken(res, user._id)
                res.status(200).json({
                    id : user._id,
                    name : user.name,
                    email : user.email,
                    role:user.role,
                    token:req.cookies.jwt
                })
            }else{
                next(errorHandler(401, "Invalid Email or Password"))
            }
    } catch (error) {
       next(error)
    }
    

}

module.exports = { createUser, loginUser, checkUser }