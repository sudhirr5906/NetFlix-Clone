// import axios from "axios";
// import { options } from "../utils/constant";
// import { useDispatch } from "react-redux";
// import { setTrailerMovie } from "../redux/slice/movieSlice";
// import { useEffect } from "react";

// const PlayingMovie = ({ movieId }) => {
//     const dispatch = useDispatch();
    
//     useEffect(() => {
//         const playingMovieApi = async () => {
//             console.log("Fetching playing movie");
//             try {
//                 const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);
//                 if (res) {
//                     console.log("Video play response", res);
//                     const trailer = res.data.results.filter((item) => {
//                         return item.type === "Trailer"; // Fixed assignment operator
//                     });
//                     console.log("Dispatching trailer");
//                     dispatch(setTrailerMovie(trailer.length > 0 ? trailer[0] : res.data.results[0]));
//                 }
//             } catch (error) {
//                 console.log("Video play error", error);
//             }
//         };

//         playingMovieApi(); // Call the async function

//     }, [dispatch, movieId]); // Include dependencies for useEffect

//     return null; // Or your component's UI
// };

// export default PlayingMovie;
