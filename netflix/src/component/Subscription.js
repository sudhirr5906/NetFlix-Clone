import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { API_END_POINT } from '../utils/constant';
// import { useNavigate } from 'react-router-dom';

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
  
  
const Subscription = () => {
  // const navigate=useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const userDetail=useSelector((store)=>store.user.user)
  const [paymentURl,setPaymentUrl]=useState("")
// console.log(userDetail);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the form submission here
    // For example, you could log the selected plan
    if (selectedPlan !== null) {
      const data={
        planId:plans[selectedPlan].planId,
        planName:plans[selectedPlan].name,
        planAmount:plans[selectedPlan].amount,
        userEmail:userDetail.email,
        userFullName:userDetail.fullName,
        userId:userDetail._id,
      }

      console.log(data);
      try {
        const res=await axios.post(`${API_END_POINT}/createTransaction`,data);
        const checkSum=res.data.checkSum;
        const paymentPayload=res.data.paymentPayload;
        console.log("api",checkSum);
        console.log("payt",paymentPayload);
        const paymenturl=res.data.paymenturl;
        if(res.data){
          const result=await axios.post(paymenturl,
            {
        
            request:paymentPayload
          },
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              'X-VERIFY':checkSum,
                    }
        });
          if(result){

            const url=result.data.data.instrumentResponse.redirectInfo.url;
            console.log("subscription response",result);
            const merchantTransactionId=result.data.data.merchantTransactionId

              console.log("merchantTransactionId",merchantTransactionId);
            //   navigate(`//${url}`);
            // setPaymentUrl(url)
            window.location.href=url;
            // navigate("/body/successfull");

            // const statusRes=await axios.post(`${API_END_POINT}/statusSubscription/?id=${merchantTransactionId}`)
            // if(statusRes){
            //   navigate("/body/successfull")
            //   console.log("status res",statusRes);
            //   const statusUrl=statusRes.data.statusUrl;
            //   console.log("status url",statusUrl);
            //   const checksum=statusRes.data.checksum;
            //   const MERCHANT_ID=statusRes.data.MERCHANT_ID;
            //   const statusResult=await axios.get(statusUrl,{
            //     headers: {
            //       accept : 'application/json',
            //       'Content-Type': 'application/json',
            //       'X-VERIFY': checksum,
            //       'X-MERCHANT-ID': MERCHANT_ID
            //   },
            //   }).then((response)=>{navigate("/body/successfull")}).catch((error)=>{console.log(error);});
        
            // }
            }
          
        }
        // console.log("subscription response",res);
      } 
      catch (error) {
        console.log("subscription error",error);
        console.log("subscription error DATA",error.response?error.response.data:error.message);
      }
      console.log(`Selected Plan: ${plans[selectedPlan].name}`);
    } else {
      console.log('No plan selected');
    }
  };

  return (

    <>
  {paymentURl?<div  className=' absolute w-[30%] h-[90%] mt-12 ml-[30%] p-10' >
   <iframe
        src={paymentURl}
        title="Amazon"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      />
  </div>:
    <form onSubmit={handleSubmit} className="abolute  text-center py-10 px-4">
      <p className="text-sm text-gray-500">STEP 1 OF 4</p>
      <h1 className="text-2xl font-semibold mt-2 mb-6">Choose the plan that’s right for you</h1>

      <div className="flex flex-wrap justify-center gap-6 mb-6 relative">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative w-56 p-4 border rounded-lg shadow-md cursor-pointer transition-colors duration-300 ${
              selectedPlan === index ? 'border-red-600' : 'border-gray-200 hover:border-red-600'
            }`}
            onClick={() => setSelectedPlan(index)}
          >
            {/* "Most Popular" Label */}
            {plan.popular && (
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md font-bold shadow-lg">
                Most Popular
              </div>
            )}
            
            {/* Plan Heading */}
            <div className={`absolute top-0 left-0 right-0 p-2 rounded-t-lg ${plan.bgColor} text-white font-semibold`}>
              {plan.name} <span className="text-sm font-normal">{plan.resolution}</span>
            </div>
            
            {/* Radio Button */}
            <div className="absolute top-3 right-3">
              <input
                type="radio"
                name="plan"
                value={plan.name}
                checked={selectedPlan === index}
                onChange={() => setSelectedPlan(index)}
                className="form-radio text-red-600"
              />
            </div>

            {/* Plan Details */}
            <div className="mt-10 ">
              <div className="border-t pt-2 my-4">
                <p className="text-sm text-gray-700 ">Monthly price: <strong>{plan.price}</strong></p>
              </div>
              <div className="border-t pt-2 my-4">
                <p className="text-sm text-gray-700">Video and sound quality: <strong>{plan.quality}</strong></p>
              </div>
              <div className="border-t pt-2 my-4">
                <p className="text-sm text-gray-700">Resolution: <strong>{plan.resolution}</strong></p>
              </div>
              {plan.specialFeature && (
                <div className="border-t pt-2 my-4">
                  <p className="text-sm text-gray-700">{plan.specialFeature}</p>
                </div>
              )}
              <div className="border-t pt-2 my-4">
                <p className="text-sm text-gray-700">Supported devices: <strong>{plan.devices}</strong></p>
              </div>
              <div className="border-t pt-2 my-4">
                <p className="text-sm text-gray-700">Pack Validity: <strong>{plan.packValidity}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button type="submit" className="bg-red-600 text-white font-medium py-3 px-10 rounded-md hover:bg-red-700 transition duration-300">
        Next
      </button>
      <p className="text-xs text-gray-500 mt-6 max-w-lg mx-auto">
        HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. 
        Not all content is available in all resolutions. Terms of Use apply.
      </p>
    </form>}
    </>
  );

}

export default Subscription