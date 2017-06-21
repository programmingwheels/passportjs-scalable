var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js')
var studentController = require('../controllers/student.js');
var middleware = require('../middleware/authenticate')

/* GET home page. */

module.exports = function(passport){
  router.get('/',middleware.isAuthenticated, studentController.getStudents,function(req, res, next) {
    res.render('index', { title: 'Express',user_id : 'lenin',success:req.flash('success'),students:req.students });
  });

  router.get('/register', function(req, res, next) {
    res.render('register', { errorsignup: req.flash('signuperror') });
  });

  router.get('/login',function(req,res,next){
    res.render('login',{errorlogin:req.flash('loginError')});
  })

  router.get('/add-student',middleware.isAuthenticated,function(req,res,next){
    res.render('add_student',{error:req.flash('error')});
  })

  router.get('/view/:id',middleware.isAuthenticated,studentController.getStudentDetails,function(req,res,next){
    res.render('update_student',{error:req.flash('error'),success:req.flash('success'),student:req.student});
  })

  router.get('/delete-student/:id',middleware.isAuthenticated,function(req,res,next){
    //res.render()
  })

  router.post('/register',userController.register)

  router.post('/login',passport.authenticate('login',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash : true
  }))

  router.post('/add-student',middleware.isAuthenticated,studentController.addStudent)

  router.post('/update-student',middleware.isAuthenticated,studentController.updateStudent)

  router.get('/delete/:id',middleware.isAuthenticated,studentController.deleteStudent)

  router.get('/logout',middleware.isAuthenticated,function(req,res,next){
    req.logout();
    res.redirect('/')
  })



  return router;
}
