import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setTrailerMovie } from '../redux/slice/movieSlice';
import { options } from '../utils/constant';

const VideaBackground = ({ movieId, bool }) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store.movie.trailerMovie);
  useEffect(() => {
    const playingMovieApi = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);
        if (res) {
          const trailerData = res.data.results.filter((item) => item.type === "Trailer");
          dispatch(setTrailerMovie(trailerData.length > 0 ? trailerData[0] : res.data.results[0]));
        }
      } catch (error) {
        console.log("Video play error", error);
      }
    };

    if (movieId) {
      playingMovieApi();
    }

    // Cleanup if necessary
    return () => {
      // Optional: Cancel axios request or perform cleanup
    };
  }, [dispatch, movieId]);

  if (!trailer) {
    return null; // Or a loading spinner
  }
console.log("bool",bool);
  return (
    <div className='w-vw overflow-hidden'>
      <iframe  src={bool?`https://www.youtube.com/embed/${trailer?.key}?si=dS4qgC89emSTUaw2&autoplay=1&mute=1&loop=1&playlist=${trailer?.key}&${bool?'controls=1':'controls=0'}`:"https://www.youtube.com/embed/jaVcDaozGgc?si=5vxsYimlAcfwgLad&autoplay=1&mute=1&loop=1&playlist=jaVcDaozGgc&controls=0" }

        className={`${bool ? 'w-[100%]' : 'w-screen aspect-video'}`}
        title="YouTube video player" 
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideaBackground;
