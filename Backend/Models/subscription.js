const mongoose=require("mongoose");
const transaction = require("./transaction");

const subscriptionSchema=new mongoose.Schema({
   planStatus:{
    type:String,
   },
   planName:{
    type:String,
   },
   planAmount:{
    type:Number,
   },
   planDuration:{
    type:String,
   },
   planStartDate:{
    type:String,
   },
   planEndDate:{
    type:String,
   },
   planUserEmail:{
    type: String,
   }
   
});

const subscription= mongoose.model('subscription',subscriptionSchema);

module.exports=subscription;