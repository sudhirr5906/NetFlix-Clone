import React, { useState } from 'react'
// import Header from './Header'
import axios from 'axios';
import {useFormik } from 'formik';
import { API_END_POINT } from '../utils/constant';
import { loginSchema, registerSchema } from '../schema/Schema';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slice/userSlice';


const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate(); 
  const [isLogin, setIsLogin]=useState(true);
  // const [fullName,setFullName]=useState("");
  // const [email,setEmail]=useState("");
  // const [password,setPassword]=useState("");

  const initialValues={
    fullName:"",
    email:"",
    password:""
  }


  const handleLogin=()=>{
setIsLogin(!isLogin);
  }

  const getInputData= async()=>{
    // e.preventDefault();
    console.log(values.fullName,values.email,values.password);
    console.log(`${API_END_POINT}/register`);
    try{
      if(isLogin){
        const response=await axios.post(`${API_END_POINT}/login`,{
          email:values.email,password:values.password
        })
        if(response){
          console.log(response);
          const token=response.data.token
          const user=response.data.loginUser
          localStorage.setItem("token",token);
          dispatch(setUser(user))
          navigate("/body/browse");

        }
      }
      else{
        const response =await axios.post(`${API_END_POINT}/register`,{
    
          fullName:values.fullName,email:values.email,password:values.password
       
      });
      if(response){
        setIsLogin(true)
        toast(response.data.msg,{
          position: "top-right", 
        })

        console.log("ok");
      }
      }
    }
    catch(err){
      toast.error(err.response.data.msg)
      console.log("error is",err);
    }
      
  }

  const {values,errors,touched,handleSubmit,handleChange,handleBlur}=useFormik({
      initialValues,
      validationSchema:()=>{
        if(isLogin){
           return loginSchema
        }
        else{
         return registerSchema
        }
      },
      onSubmit:(values,action)=>{
          getInputData(values)
          action.resetForm();
      }
  })



  return (
    <>
    <div className='w-full absolute'>
    <ToastContainer/>
      <img src="https://wallpapers.com/images/hd/netflix-background-gs7hjuwvv2g0e9fj.jpg" alt="netflix" />
    </div>
    <form onSubmit={handleSubmit} method='post' className='px-7 py-24 absolute flex flex-col w-3/12 my-36 mx-auto left-0 right-0 bg-black items-center justify-center opacity-80'>
      
      <h1 className='text-3xl text-white mb-4'>{isLogin?'Login':'Signup'}</h1>
      <div>
        
       {!isLogin? 
       <>
       <input type="text" placeholder='Full Name' name='fullName' onChange={handleChange} onBlur={handleBlur}  value={values.fullName} className='p-3 w-[100%] outline-none my-2 rounded-sm bg-gray-800 text-white' />
       {touched.fullName && errors.fullName?(<p className='text-red-600'>{errors.fullName}</p>):null}
       </>
       :null}

        <input type="email" placeholder='Email' name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className='p-3 w-[100%] outline-none my-2 rounded-sm bg-gray-800 text-white' />
        {touched.email && errors.email?(<p className='text-red-600'>{errors.email}</p>):null}
        <input type="password" placeholder='Password' name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className='p-3 w-[100%] outline-none my-2 rounded-sm bg-gray-800 text-white' />
        {touched.password && errors.password?(<p className='text-red-600'>{errors.password}</p>):null}
        <button type='submit' className='bg-red-600 text-white font-medium ml-2 w-[95%] mt-2 p-3'>{isLogin?'Login':"Signup"}</button>
        <p className='text-white'>{isLogin?"I dont Have Account?": "Already have account?"} <span className='text-blue-600 cursor-pointer' onClick={handleLogin}>{isLogin?'Signup':'Login'}</span> </p>
      </div>
    </form>
      
    {/* <Link to="/header">test</Link> */}
    </>

  
  )
}

export default Login