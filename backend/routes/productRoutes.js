const express = require('express');
const {createProduct,getProduct,getProductDetail,updateProduct} = require('../controllers/productController.js');
const {protect} = require('../utills/isAuth.js')

const router = express.Router();

router.post('/create',protect,createProduct);
router.get('/get',protect,getProduct);
router.get('/get/:id',protect,getProductDetail)
router.patch('/update/:id',protect,updateProduct);

module.exports = router;