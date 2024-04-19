const { Brand } = require("../models/BrandModel.js")

const createBrand = async(req,res) =>{
    try {
        const brand = await Brand.create(req.body);    
        res.status(200).json(brand);       
    } catch (error) {
        res.status(404).json(error)
    }
}
const getBrand = async(req,res) =>{
    try {
        const getBrand = await Brand.find();
        res.status(200).json(getBrand);  
    } catch (error) {
        res.status(404).json(error)
    }
}
module.exports = {getBrand,createBrand}