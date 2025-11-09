import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";

import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";


const persistConfig = {
  key: "root",
  storage,
};


const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,

});

export const persistor = persistStore(store);
