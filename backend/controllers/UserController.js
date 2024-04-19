const {User} = require('../models/UserModel')
const updateUser = async (req, res) => {
    const  id  = res.user._id;
      try {
        if(req.body.newUser){
          const user = await User.findByIdAndUpdate(id, req.body.newUser, { new: true });
          res.status(200).json(user);
        }
        else{
          const user = await User.findByIdAndUpdate(id, req.body, { new: true });
          res.status(200).json(user);
        }
     
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserById = async (req, res) => {
    const id = res.user._id
    console.log("user"+id)
    try {
      const user = await User.findById(id);
      res.status(200).json({id:user.id,addresses:user.addresses,email:user.email,role:user.role});
    } catch (err) {
      res.status(400).json(err);
    }
  };
module.exports = {updateUser,fetchUserById}