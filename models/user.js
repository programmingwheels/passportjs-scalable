var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise  = require('bluebird');
var userSchema = new mongoose.Schema({
  first_name :{type:String,required:true},
  last_name :{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true}
})

userSchema.methods.HashPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
}

userSchema.methods.ComparePassword = function(password){
  return bcrypt.compareSync(password,this.password)
}
var user = mongoose.model('User',userSchema);
user = Promise.promisifyAll(user);
Promise.promisifyAll(user.prototype);
module.exports = user;
