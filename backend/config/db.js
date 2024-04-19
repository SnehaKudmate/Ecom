const mongoose = require('mongoose');

const db = async() =>{
try {
    const db  = await mongoose.connect('mongodb://localhost:27017/e-commWeb');
    if(db){
        console.log("database connected successfully")
    }
} catch (error) {
    console.log(error)
}
}
module.exports = db ;