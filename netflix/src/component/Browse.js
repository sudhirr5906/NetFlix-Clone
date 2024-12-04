import MainContainer from './MainContainer'
import MovieContainer from './MovieContainer'
import nowPlayingMovie from '../movieApis/nowPlaying'
import popularMovie from '../movieApis/popularMovies'
import topRatedMovie from '../movieApis/topRatedMovie'
import upcomingMovie from '../movieApis/upcomingMovie'
import { useSelector } from 'react-redux'
import SearchMovies from './SearchMovies'

const Browse = () => {
  const toggle=useSelector((store)=>store.movie.toggle)
  nowPlayingMovie();
  popularMovie();
  topRatedMovie();
  upcomingMovie();


  return (
    <>
   {
    toggle?<SearchMovies/>: (
      <>
       <MainContainer/>
       <MovieContainer/>
      </>
    )
   }
    
   
    </>
  )
}

export default Browse