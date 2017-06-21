var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user')
module.exports = function(passport){
   passport.serializeUser(function(user,done){
      done(null,user.id)
   })
   passport.deserializeUser(function(id,done){
      User.findByIdAsync(id).then(function(u){
        done(null,u)
      }).catch(function(err){
        done(err,null);
      })
   })

   passport.use('login',new LocalStrategy({
     usernameField :'email',
     passwordField :'password',
     passReqToCallback:true
   },function(req,email,password,done){
     
       User.findOneAsync({'email':email}).then(function(u){
         if(!u)
             return done(null,false,req.flash('loginError','User does not exits'))
         else if(!u.ComparePassword(password)){
            return done(null,false,req.flash('loginError','Incorrect Password'))
         }else{
           return done(null,u)
         }
       }).catch(function(err){
         return done(err)
       })
   }))
}
