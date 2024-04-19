const express = require('express');
const {createBrand,getBrand} = require('../controllers/brandController.js');
const {protect} = require('../utills/isAuth.js')


const router = express.Router();
router.post('/create',createBrand);
router.get('/get',getBrand);
module.exports = router;