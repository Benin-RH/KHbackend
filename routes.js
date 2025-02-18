
const express=require("express");
const Router=express.Router();
const staff=require('./Staff/staffControler')
const student=require('./Student/studentController')
const Admin=require('./Admin/AdminControler')

/* staff */
Router.post("/staffRegistration", staff.staffRegistration);
Router.post("/staffLogin", staff.staffLogin);
Router.post("/studentCheckMail",student.studentCheckMail);
Router.post("/staffChangePassword",student.setNewPassword);
Router.post("/staff",staff.findStaff);


/* student */
Router.post("/studentRegistration", student.studentRegistration);
Router.post("/studentLogin", student.studentLogin);
Router.post("/student",student.findStudent);
Router.post("/studentCheckMail",student.studentCheckMail);
Router.post("/studentChangePassword",student.setNewPassword);

/*Admin*/
Router.post('/AdminLogin',Admin.loginAdmin)

module.exports=Router

