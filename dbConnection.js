const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/KHBackend")
let db=mongoose.connection
db.on("error",console.error.bind("error"))
db.once("open",function(){
    console.log("connection successfull");
})
module.export=db

