import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_END_POINT } from '../utils/constant'
import Subscription from './Subscription'
// import { setUser } from '../redux/slice/userSlice';



const Body = () => {
const [subscription,setSubscription]=useState();
  const navigate=useNavigate();
  

  const user =useSelector((store)=>store.user);
const checkAuthorization=async()=>{
  try{

    const token=localStorage.getItem("token")
    const res= await axios.post(`${API_END_POINT}/home`,{},{
      headers:{
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json', 
      }
      })
    if(res){

      // const users=res.data.userDetail
      console.log(user);

      
    }
  }
  catch(error){
    console.log("error is",error);
    navigate("/");
  }
}
const checkSubscription=async()=>{
  const res=await axios.post(`${API_END_POINT}/checkSubscriptionValidation`,{
    email:user?.user?.email
  });
  console.log("checkSubscription",res.data.response);
  // console.log("length",res?.data?.response[0]?.subscription);
  const checkSubscriptions=res?.data?.response[0]?.subscription;
  console.log(checkSubscriptions);

  if(checkSubscription){
    const planEnd=new Date(checkSubscriptions?.planEndDate)

    console.log("plan end date",planEnd.getTime());
    if(new Date()<planEnd.getTime()){
      console.log("not active");
      setSubscription("active");
    }
    else{
      console.log("jhd");
      setSubscription(null);
    }
  }
}

// useEffect(()=>{
  

// // eslint-disable-next-line react-hooks/exhaustive-deps
// },[navigate])
useEffect(()=>{
  checkAuthorization();
  if(!user){
    navigate("/");
  }
  else{
    console.log("hk")
    checkSubscription();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

console.log(subscription);

  return (
    <>
    <div>
      {/* <Subscription/> */}
    {subscription?<Outlet/>:<Subscription/>}
    </div>
    </>
  )
}

export default Body