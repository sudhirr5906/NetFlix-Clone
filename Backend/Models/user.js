const mongoose =require("mongoose");

const dbConnection=require("../Connection/connection");
const { type } = require("os");
const { timeStamp } = require("console");

dbConnection("mongodb://127.0.0.1:27017/netflix");

const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    transactions:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'transation'
       },
         
},{timeStamp:true})

const user=mongoose.model("user",userSchema);

module.exports=user;