const express=require("express");
const app=express();
const dotenv =require("dotenv");
const route=require("./Routes/route")
const cors = require('cors');
const bodyParser = require("body-parser");

dotenv.config({
    path:'.env'
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use("/api",route)
const port = process.env.PORT || 8080;


app.listen(port,()=>{
    console.log(`Port is Running on ${port}`);
})
