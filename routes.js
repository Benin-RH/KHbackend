const express=require("express");
const Router=express.Router();
const staff=require("./Staff/staffControler");
Router.post("/staffRegistration",staff.addstaff)


module.exports=Router