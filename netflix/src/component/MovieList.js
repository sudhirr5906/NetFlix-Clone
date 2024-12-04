import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies,searchMovie=false}) => {
  console.log("all my movies",title);
  return (
    <div className='px-8 '>
      
          <h1 className={`text-3xl ${searchMovie? 'text-black':'text-white'} py-4`}>{title}</h1>


          <div className='flex overflow-x-auto no-scrollbar cursor-pointer'>
    <div className='flex items-center'>
      {
        movies?.map((movie)=>{
          return (
            <MovieCard key={movie.id} movieId={movie.id} posterPath={movie.poster_path} />
          )
        })
      }
     
     </div>
    </div>
    </div>
  )
}

export default MovieList