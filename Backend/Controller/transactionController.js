const dotenv =require("dotenv");
const crypto=require("crypto");
const { request } = require("http");
const axios=require("axios");
const {v4:uuidv4}=require("uuid");
const transaction=require("../Models/transaction");
const subscription=require('../Models/subscription');
const user = require("../Models/user");
const plans = [
    {
      planId:1,
      name: 'Mobile',
      resolution: '480p',
      price: '₹149',
      amount: 149,
      quality: 'Fair',
      devices: 'Mobile phone, tablet',
      packValidity: '1 month',
      downloads: 1,
      bgColor: 'bg-blue-700', // Background color for the heading
    },
    {
      planId:2,
      name: 'Basic',
      resolution: '720p',
      price: '₹199',
      amount: 199,
      quality: 'Good',
      devices: 'TV, computer, mobile phone, tablet',
      packValidity: '3 month',
      downloads: 1,
      popular: true, // Marking this as the most popular plan
      bgColor: 'bg-gradient-to-r from-purple-500 to-blue-500',
    },
    {
      planId:3,
      name: 'Standard',
      resolution: '1080p',
      price: '₹499',
      amount: 499,
      quality: 'Great',
      devices: 'TV, computer, mobile phone, tablet',
      packValidity: '6 month',
      downloads: 2,
      bgColor: 'bg-gradient-to-r from-purple-500 to-blue-500',
    },
    {
      planId:4,
      name: 'Premium',
      resolution: '4K + HDR',
      price: '₹649',
      amount: 649,
      quality: 'Best',
      devices: 'TV, computer, mobile phone, tablet',
      packValidity: '1 year',
      downloads: 6,
      specialFeature: 'Spatial audio (immersive sound)',
      bgColor: 'bg-gradient-to-r from-purple-500 to-red-500',
    },
  ];

dotenv.config({
    path:'.env'
})

const createTransaction=async(req,res)=>{
    const merchantId=process.env.MERCHANT_ID;
    const merchantKey=process.env.MERCHANT_KEY;
    console.log(merchantId);
    const {planId,planName,planAmount,userEmail,userId,userFullName}=req.body;
    // const orderId=planId+userId;
//    const redirectUrl= `/api/statusSubscription/?id=${orderId}`;
   const redirectUrl= `http://localhost:8080/api/statustransaction/?`;
   const orderId = uuidv4()
   const redirectMode= "POST";
//    const callbackUrl= "https://webhook.site/callback-url";
const payload={
    name:planName,
    merchantId:merchantId,
    merchantUserId: userId,
    email:userEmail,
    amount: planAmount*100,
    merchantTransactionId:orderId,
    redirectUrl:`${redirectUrl}id=${orderId}&userId=${userId}`,
    redirectMode:'POST',
    paymentInstrument: {
      type: "PAY_PAGE"
    },
    // orderDetail:{
    //     name:planName,
    // }
  }
  console.log(payload.redirectUrl);
  const paymentPayload=Buffer.from(JSON.stringify(payload)).toString('base64');
  const keyIndex =1;
  const payloadData=paymentPayload+"/pg/v1/pay"+merchantKey;
  const SHA256=crypto.createHash('sha256').update(payloadData).digest('hex');
  const checkSum=SHA256+ '###'+keyIndex;
const paymenturl='https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';
//  console.log(process.env.MERCHANT_KEY);
//  console.log("Payload to send:", JSON.stringify({
//     paymentPayload
// }));

res.status(200).json({
    checkSum,
    paymentPayload,
    paymenturl,
})
}

const statusTransaction=async(req,res)=>{
    const merchantTransactionId = req.query.id;
    const userId=req.query.userId;
    // console.log("uid",uid);
    console.log("merchant/",merchantTransactionId);
    const MERCHANT_KEY=process.env.MERCHANT_KEY;
    const MERCHANT_ID=process.env.MERCHANT_ID;
    const keyIndex =1;
    const payloadData=`/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`+MERCHANT_KEY;
    const SHA256=crypto.createHash('sha256').update(payloadData).digest('hex');
    const checkSum=SHA256+ '###'+keyIndex;
    const statusUrl=`https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`
    console.log("statusUrl",statusUrl);
    try {
        const statusRes=await axios.get(statusUrl,{ 
            headers: {
            accept : 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checkSum,
            'X-MERCHANT-ID': MERCHANT_ID
        }},).then(async(response)=>{
            // console.log(statusRes); 
            const {merchantId,merchantTransactionId,transactionId,amount,state}=response.data.data;
           
            const resp=await transaction.create({
                transactionUser:userId, merchantId,merchantTransactionId,transactionId,amount:amount/100,state,
            });
            console.log(response.data.data); 
            if(resp){
                plans.map(async(plan)=>{
                const amounts=amount/100;
                const nowDate=new Date();
                const ends=nowDate.setMonth(nowDate.getMonth()+3)
                const planEnds=new Date(ends);
                console.log("planEnds",planEnds);
                if(amounts==plan.amount){
                console.log("plan is",plan);
                const userDetail=await user.findOne({_id:userId});
                    if(userDetail){

                   
                    console.log("userDetail",userDetail);
                    console.log("userDetail.email",userDetail.email);
                    const createSubscription=await subscription.create({
                        planStatus:'active',
                        planName:plan.name,
                        planAmount:plan.amount,
                        planDuration:Number(plan.packValidity.charAt(0)),
                        planStartDate:nowDate,
                        planEndDate:planEnds,
                        planUserEmail:userDetail.email,
                    })
                }
            } })
            }
            
            res.redirect("http://localhost:3000/body/browse")
        
        }).catch((error)=>{
            console.log(error);
              res.redirect("http://localhost:3000/body/subscription");
        })
        // if (statusRes.data.success === true){
    } 
    catch (error) {
        console.log("error",error);
    }
   
    // res.status(200).json({
    //     msg:"ok",
    //     checkSum,
    //     MERCHANT_ID,
    //     statusUrl,
    // })
}



module.exports={
    createTransaction,
    statusTransaction
}
