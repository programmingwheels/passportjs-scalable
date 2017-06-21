var User = require('../models/user.js');
var userController={}

userController.register = function(req,res,next){
  console.log(req.body);
   User.findOneAsync({"email":req.body.email}).then(function(user){
     if(user){
       req.flash('signuperror','User with the email already exists')
       return res.redirect('/register')
     }else{
       var user = new User();
       user.first_name = req.body.first_name;
       user.last_name = req.body.last_name;
       user.email = req.body.email;
       user.password = user.HashPassword(req.body.password)
       return user.saveAsync()
     }
   }).then(function(user){
     return res.redirect('/login')
   }).catch(function(err){
     return res.redirect('/register');
   })

}

module.exports = userController;
