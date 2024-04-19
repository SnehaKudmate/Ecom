const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema =  mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password :{type:String,required:true},
    addresses: { type: [mongoose.Schema.Types.Mixed] }, 
    name: { type: String },
    role: { type: String, required: true, default:'user' },
});

const virtual = userSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
   next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword , this.password)
}

exports.User = mongoose.model('User',userSchema) 