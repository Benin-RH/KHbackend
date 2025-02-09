const express=require("express");
const Router=express.Router();
const staff=require('./Staff/staffControler')
const student=require('./Student/studentController')


/* staff */
Router.post("/staffRegistration",staff.staffRegistration)
Router.post("/forgetPassword",staff.forgetPassword)

/* student */
Router.post('/studentRegistration',student.studentRegistration)


module.exports=Router