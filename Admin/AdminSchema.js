const mongoose=require('mongoose')
const AdminSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:Number,required:true},
})

module.exports=new mongoose.model('Admin',AdminSchema);