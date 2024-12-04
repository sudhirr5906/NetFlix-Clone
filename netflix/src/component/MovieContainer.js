import React, { useEffect } from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const MovieContainer = () => {

  const movie =useSelector((store)=>store.movie);
  console.log("store movie",movie);
  return (
    <div className='bg-black'>
      <div className='-mt-[25%] relative z-10'>

      <MovieList title={"Popular Movies"} movies={movie.popularMovie}/>
      <MovieList title={"Now Playing Movies"} movies={movie.nowMovie}/>
      <MovieList title={"Top Rated Movies"} movies={movie.topRatedMovie}/>
      <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovie}/>
      </div>
  </div>
  )
}

export default MovieContainer