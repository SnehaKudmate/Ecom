const express = require('express');
const {createOrder, fetchAllOrders,updateOrder,fetchOrdersByUser} = require('../controllers/orderController.js');
const {protect} = require('../utills/isAuth.js')


const router = express.Router();
router.post('/create',protect,createOrder);
router.get('/',protect,fetchAllOrders);
router.get('/user',protect,fetchOrdersByUser);
router.patch('/update/:id',protect,updateOrder);

module.exports = router;