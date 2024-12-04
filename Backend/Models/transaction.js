const mongoose =require("mongoose");

transactionSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user',
    },
    merchantId:{
        type:String,
    },
    merchantTransactionId:{
        type:String,
    },
    transactionId:{
        type:String,
    },
    amount:{
        type:Number,
    },
    state:{
        type:String,
    },
    transactionUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
       }
})

const transaction=mongoose.model("transaction",transactionSchema);

module.exports=transaction