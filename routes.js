const express=require("express");
const Router=express.Router();
const staff=require("./Staff/staffControler");


/* staff */
Router.post("/staffRegistration",staff.addstaff)

/* student */
const student=require('./Student/studentController')
Router.post('/studentRegistration',student.studentRegistration)


module.exports=Router