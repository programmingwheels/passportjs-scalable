var mongoose = require('mongoose')
var Promise = require('bluebird')

var studentSchema = new mongoose.Schema({
  first_name:{type:String,required:true},
  last_name:{type:String,required:true},
  age:{type:Number},
  school:{type:String}
})

var student = mongoose.model('Student',studentSchema);
student = Promise.promisifyAll(student);
Promise.promisifyAll(student.prototype);
module.exports = student;
