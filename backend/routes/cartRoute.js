const { addCartItem ,fetchCartByUser,updateCart,deleteFromCart} = require('../controllers/CartController');
const express = require('express');
const {protect} = require('../utills/isAuth.js')

const router = express.Router();

router.post('/create',protect,addCartItem);
router.get('/',protect,fetchCartByUser);
router.patch('/update/:id',protect,updateCart);
router.delete('/delete/:id',protect,deleteFromCart);
module.exports = router;