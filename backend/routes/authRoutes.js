const express = require('express');
const {createUser,loginUser,checkUser} = require('../controllers/AuthController.js');
const {protect} = require('../utills/isAuth.js')

const router = express.Router();
router.post('/create',createUser);
router.post('/login',loginUser);
router.get('/check',checkUser);

module.exports = router;