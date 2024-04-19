const {Cart} = require('../models/cartModel');
const mongoose = require('mongoose')

const addCartItem = async(req,res,next) =>{
  console.log(req.body)
try {
    const doc = await Cart.create({...req.body,user:res.user._id});
    const result = await doc.populate('product');
    res.status(201).json(result);
} catch (error) {
  console.log(error)
}
}

const fetchCartByUser = async(req,res,next)=>{
  const id = res.user._id
    try {
        const cartItems = await Cart.find({user:id}).populate('product');    
        res.status(200).json(cartItems);
      } catch (err) {
        res.status(400).json(err);
      }
}

const updateCart = async (req, res, next) => {
    const { id } = req.params;
    const { quantity, product, user } = req.body;

    try {
        // Update the cart
        const updatedCart = await Cart.findByIdAndUpdate(id, { quantity, product:product.id, user }, { new: true }).populate('product');

        if (!updatedCart) {
            console.log('Cart not found');
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json(updatedCart);
    } catch (err) {
        console.error('Error updating cart:', err);
        res.status(500).json({ error: 'An error occurred while updating the cart.' });
    }
}

const deleteFromCart = async (req, res) => {
  const { id } = req.params;

  try {
  const doc = await Cart.findByIdAndDelete(id);
  res.status(200).json(doc);
} catch (err) {
  res.status(400).json(err);
}
};


module.exports = {addCartItem,fetchCartByUser,updateCart,deleteFromCart}