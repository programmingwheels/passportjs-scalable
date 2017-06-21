var Student = require('../models/student.js');

var studentController = {};

studentController.addStudent = function(req,res,next){
  if(req.body.first_name=='' || req.body.last_name==''|| req.body.age=='' || req.body.school==''){
    req.flash('error','Please fill all the  fields')
    return res.redirect('/add-student')
  }
  var student = new Student();
  student.first_name = req.body.first_name;
  student.last_name = req.body.last_name;
  student.age = req.body.age;
  student.school = req.body.school;
  student.saveAsync().then(function(stud){
    req.flash('success','Student added successfully')
    return res.redirect('/')
  }).catch(function(err){
    req.flash('error','Error Occured While Saving')
    return res.redirect('/add-student')
  })
}

studentController.updateStudent = function(req,res,next){
  Student.findByIdAsync(req.body.id).then(function(student){
    student.first_name = req.body.first_name;
    student.last_name = req.body.last_name;
    student.age = req.body.age;
    student.school = req.body.school;
    return student.saveAsync()
  }).then(function(s){
     req.flash('success','Student Details Updated Successfully')
    return res.redirect('/view/'+req.body.id)
  }).catch(function(err){
    req.flash('error','Error Occured while updating')
    return res.redirect('/view/'+req.body.id)
  })
}

studentController.deleteStudent = function(req,res,next){
  Student.removeAsync({"_id":req.params.id}).then(function(){
    req.flash('success','Student Details Deleted Successfully')
    return res.redirect('/')
  }).catch(function(err){
    req.flash('error','Error Occured while deleting')
    return res.redirect('/')
  })
}

studentController.getStudents = function(req,res,next){
  Student.findAsync({}).then(function(students){
    req.students = students;
    next();
  }).catch(function(err){
    req.flash('Error','Error Occured while deleting')
    reqs.redirect('/');
  })
}

studentController.getStudentDetails = function(req,res,next){
  Student.findByIdAsync(req.params.id).then(function(student){
    req.student = student;
    next();
  }).catch(function(err){
    req.flash('Error','Error Occured while deleting')
    reqs.redirect('/');
  })
}
module.exports = studentController;
