import axios from 'axios'
import React, { useState } from 'react'
import { options, SEARCH_MOVIE } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedMovie } from '../redux/slice/searchSlice'
import MovieList from './MovieList'

const SearchMovies = () => {
  const dispatch=useDispatch();
const [searchMovie,setSearchMovie]=useState("")
const {movieName,searchedMovie}=useSelector((store)=>store.searchedMovie)
console.log(searchedMovie)
const submitHandler= async()=>{
  try {
    const res=await axios.get(`${SEARCH_MOVIE}?query=${searchMovie}&include_adult=false&language=en-US&page=1`,options);
    const movies=res.data.results;
    console.log("mov name",movieName);
    dispatch(setSearchedMovie({searchMovie,movies}))
    
  } catch (error) {
    console.log("search movie error",error);
  }
  setSearchMovie("")
}


  return (
    <>
    
    <div className='flex justify-center pt-[10%] w-[100%]'>
        <form className='w-[50%]'>
      <div className='flex justify-between shadow-md border-2 p-2 border-gray-200 rounded-lg w-[100%] '>

        <input type="text" value={searchMovie} onChange={(e)=>setSearchMovie(e.target.value)} placeholder='SEARCH MOVIE......' className='w-full outline-none rounded-md text-lg' />
        <button type='button' onClick={submitHandler} className='bg-red-800 text-white rounded-md px-4 py-2'>SEARCH</button>
      </div>
        </form>
    </div>
    <div>
      <h3 className='ml-2 mt-1 text-2xl'>Reslut of:</h3> 
   {searchedMovie?.length>0? <MovieList title={movieName} searchMovie={true} movies={searchedMovie} />:<h1>No Result Found</h1>}
    </div>
    </>
  )
}

export default SearchMovies