import { combineReducers } from "redux";
import userReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

const rootReducer = combineReducers({ userReducer });

export const Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})