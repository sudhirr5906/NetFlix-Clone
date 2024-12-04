import React from 'react'
import VideoTitle from './VideoTitle'
import VideaBackground from './VideaBackground'
import { useSelector } from 'react-redux'

const MainContainer = () => {
const movie=useSelector((store)=>store.movie?.nowMovie);
if(!movie) return;

const {id,overview,title}=movie[0];
console.log("vid id",id);
  return (
    <div >
        <VideoTitle  title={title} overview={overview} movieId={id} />
        <VideaBackground movieId={id}/>

    </div>
  )
}

export default MainContainer