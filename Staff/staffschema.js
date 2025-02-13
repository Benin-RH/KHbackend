const mongoose = require('mongoose')
const staffschema = new mongoose.Schema({
  staffname: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password: { type: Number, required: true },
  contact: { type: Number, required: true },
  user:{type:String,default:'staff'}
});

module.exports = new mongoose.model("Staff", staffschema);


