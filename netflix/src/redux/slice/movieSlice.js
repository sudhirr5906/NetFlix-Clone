import { createSlice } from "@reduxjs/toolkit";

export const movieSlice=createSlice({
    name:'movie',
    initialState:{
        nowMovie:null,
        popularMovie:null,
        topRatedMovie:null,
        upcomingMovie:null,
        toggle:false,
        trailerMovie:null,
        open:false,
        playMovieID:null
    },
    reducers:{
        setNowMovie:(state,action)=>{
            state.nowMovie=action.payload;
        },
        setPopularMovie:(state,action)=>{
            state.popularMovie=action.payload;
        },
        setTopRatedMovie:(state,action)=>{
            state.topRatedMovie=action.payload;
        },
        setUpcomingMovie:(state,action)=>{
            state.upcomingMovie=action.payload;
        },
        setToggle:(state)=>{
            state.toggle=!state.toggle;
        },
        setTrailerMovie:(state,action)=>{
            state.trailerMovie=action.payload;
        },
        removeTrailerMovie:(state)=>{
            state.trailerMovie=null;
        },
        setOpenDetails:(state,action)=>{
            const {open,movieId}=action.payload;
            state.open=open;
            state.playMovieId=movieId;
        },
    }

})

export const {setNowMovie,setPopularMovie,setTopRatedMovie,setUpcomingMovie,setToggle,setTrailerMovie,setOpenDetails,removeTrailerMovie}=movieSlice.actions;
export default movieSlice.reducer