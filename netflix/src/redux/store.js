import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import movieReducer from "./slice/movieSlice";
import {persistStore,persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import searchSlice from './slice/searchSlice'
// import {createStore}from 'redux'
let persistConfig={
    key:'root',
    storage,

  }
  // whitelist: ['uiReducer']

let rootReducer=combineReducers({
    user:userReducer,
    movie:movieReducer,
    searchedMovie:searchSlice
    
})

const persistedReducer=persistReducer(persistConfig,rootReducer)


export const store =configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore these action types
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            // Ignore these field paths in all actions
            ignoredActionPaths: ['register', 'rehydrate'],
            // Ignore these paths in the state
            ignoredPaths: ['some.nested.path'],
          },
        }),
})
export const persistor=persistStore(store)

