const express=require("express");
const route=express.Router();
const {register,login,home}=require("../Controller/userController");
const {createTransaction,statusTransaction}=require("../Controller/transactionController");
const {checkSubscription}=require("../Controller/subcriptionController")

const {checkAuth}=require("../middleware/authorization")

route.post("/register",register)
route.post("/login",login)
route.post("/home",checkAuth,home)

route.post("/createTransaction",createTransaction)
route.post("/statusTransaction",statusTransaction)


route.post("/checkSubscriptionValidation",checkSubscription)
  
module.exports=route;