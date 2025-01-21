const express=require("express");
// const cors = require("cors");
const bodyParser=require("body-parser");
const routes=require('./routes.js')
const db=require ("./dbConnection.js")


const app=express();
const port = 5001;

app.use(bodyParser.json())
app.use('/',routes)


app.listen(port,()=>{
    console.log(`App is running at http://localhost:${port}`); 
})