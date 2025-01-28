const express=require("express");
const cors = require("cors");
const bodyParser=require("body-parser");
const routes=require('./routes.js')
const db=require ("./dbConnection.js")


const app=express();
const port = 5001;

//Configure CORS
const corsOptions ={
    origin: "http://localhost:3000", //Allow request from react app
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use('/',routes)


app.listen(port,()=>{
    console.log(`App is running at http://localhost:${port}`); 
})