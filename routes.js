const express=require("express");
const Router=express.Router();
const staff=require('./Staff/staffControler')
const student=require('./Student/studentController')


/* staff */
Router.post("/staffRegistration",staff.staffRegistration)

/* student */
Router.post('/studentRegistration',student.studentRegistration)
Router.post('/studenLogin',student.studentLogin)


module.exports=Router