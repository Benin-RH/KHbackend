const mongoose=require('mongoose')
const studentSchema=new mongoose.Schema({
    studentName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:Number,required:true},
    contact:{type:Number,required:true},
    user:{type:String,default:'student'}
})

module.exports=new mongoose.model('student',studentSchema);