import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:"searchMovie",
    initialState:{
        movieName:null,
        searchedMovie:null
    },
    reducers:{
        setSearchedMovie:(state,action)=>{
            const{searchMovie,movies}=action.payload;
            state.searchedMovie=movies;
            state.movieName=searchMovie;
        }
    }
})

export const {setSearchedMovie}=searchSlice.actions;
export default searchSlice.reducer;