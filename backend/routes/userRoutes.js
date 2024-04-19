const express = require('express');
const {updateUser,fetchUserById} = require('../controllers/UserController.js');
const {protect} = require('../utills/isAuth.js')



const router = express.Router();
router.patch('/update',protect,updateUser);
router.get('/',protect,fetchUserById);

module.exports = router;