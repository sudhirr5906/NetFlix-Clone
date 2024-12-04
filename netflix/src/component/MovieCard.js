import React from 'react'
import { BANNER_URL } from '../utils/constant'
import { retry } from '@reduxjs/toolkit/query'
import { useDispatch } from 'react-redux'
import { setOpenDetails } from '../redux/slice/movieSlice'

const MovieCard = ({posterPath,movieId}) => {
  const dispatch=useDispatch();

  if(!posterPath) return null;

  const handleOpen=()=>{
    const open=true;
    dispatch(setOpenDetails({open,movieId}))
  }
  return (
    <div className="w-48 pr-2" onClick={handleOpen}>
        <img src={`${BANNER_URL}/${posterPath}`} alt="" />
    </div>
  )
}

export default MovieCard