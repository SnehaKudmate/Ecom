const { Category } = require("../models/Category");
const createCategory = async(req,res) =>{
    try {
        const category = await Category.create(req.body);    
        res.status(200).json(category);       
    } catch (error) {
        res.status(404).json(error)
    }
}

const getCategories = async(req,res) =>{
    try {
        const getCat = await Category.find();
        res.status(200).json(getCat);  
    } catch (error) {
        res.status(404).json(error)
    }
}
module.exports = {createCategory,getCategories}