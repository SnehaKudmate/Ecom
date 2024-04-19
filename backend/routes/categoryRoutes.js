const express = require('express');
const {createCategory,getCategories} = require('../controllers/categoryController.js')
const {protect} = require('../utills/isAuth.js')


const router = express.Router();
router.post('/create',protect,createCategory);
router.get('/get',protect,getCategories);
module.exports = router;