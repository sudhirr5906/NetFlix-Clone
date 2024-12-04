import React, { useEffect } from 'react'
import { IoIosArrowDropdown } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Outlet,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeTrailerMovie, setToggle } from '../redux/slice/movieSlice'
import { removeUser } from '../redux/slice/userSlice'
const Header = () => {
  const navigate=useNavigate();;
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user.user)
  const toggle=useSelector((store)=>store.movie.toggle)


  if(!localStorage.getItem("token")){
   dispatch(removeUser());
  }


const logoutHandler=()=>{
  localStorage.removeItem("token");
  if(!localStorage.getItem("token")){
    navigate("/")
    dispatch(removeUser());
    dispatch(removeTrailerMovie());
  }
}

const searchMovieHandler=()=>{
  dispatch(setToggle());
}
  return (
    <>
    <div>

 
   {user && ( <div className='absolute z-10 flex w-[100%] items-center justify-between px-6 bg-gradient-to-b from-black'>

<img className='w-56' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="" />
<div className='flex items-center'>
<IoIosArrowDropdown className='text-lg' color='white'/>
<h1 className='text-lg font-medium text-white'>{user.fullName}</h1>
<div className='ml-4'>
<button className='bg-red-500 px-2  py-2 ' onClick={searchMovieHandler}>{toggle?'Home':'Search Movie'}</button>
<button className='bg-red-500 px-2 py-2 ml-2' onClick={logoutHandler}>Logout</button>
</div>
</div>

</div>)}
  <Outlet/>  
    </div>
    </>
  )
}

export default Header