
const express=require("express");
const Router=express.Router();
const staff=require('./Staff/staffControler')
const student=require('./Student/studentController')
const Admin=require('./Admin/AdminControler')

/* staff */
Router.post("/staffRegistration", staff.staffRegistration);

/* student */
Router.post("/studentRegistration", student.studentRegistration);
Router.post("/studentLogin", student.studentLogin);
Router.post("/student",student.findStudent);
Router.post("/studentForgetPassword",student.studentChangePassword);

/*Admin*/
Router.post('/AdminLogin',Admin.loginAdmin)

module.exports=Router

