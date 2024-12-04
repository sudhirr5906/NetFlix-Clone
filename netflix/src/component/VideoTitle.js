import React, { useRef } from 'react'
import { CiPlay1, CiCircleInfo } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { setOpenDetails } from '../redux/slice/movieSlice';

const VideoTittle = ({ overview, title, movieId = null }) => {
  const dispatch = useDispatch();
  const targetSectionRef = useRef(null);

  const playMovieId = movieId;
  console.log(playMovieId)

  const handleScroll = () => {
    if (targetSectionRef.current) {
      targetSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlay = () => {
    const open = true
    dispatch(setOpenDetails({ open, movieId }))
  }
  return (
    <div className='w-[vw] absolute text-white pt-[18%] -mt-20 p-12'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <p className='w-[40%]'>{overview}</p>

      <div className='mt-8 flex'>
        <button className='flex px-6 py-2 text-black bg-white rounded-md hover:bg-opacity-80' onClick={handlePlay}>
          <CiPlay1 className='size-6' />
          <span className='ml-1'>Play</span>
        </button>
        <button className='mx-2 flex px-6 py-2 text-black bg-white bg-opacity-20 rounded-md hover:bg-opacity-30' onClick={handleScroll}>
          <CiCircleInfo className='size-7' />
          <span className='ml-1'>Watch More</span>
          </button>
      </div>

    </div>
  )
}

export default VideoTittle