import { configureStore } from "@reduxjs/toolkit";
import userReducer, { logout } from "./user";
import tagReducer from "./tag";
import selectedTagReducer from "./selectedTag";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import axios from "axios";

const reducers = combineReducers({
  user: userReducer,
  tag: tagReducer,
  selectedTag: selectedTagReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

axios.interceptors.request.use(
  function (config) {
    const accessToken = store.getState().user.accessToken;
    console.log("accessToken", accessToken);
    config.headers.Authorization = `bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data.redirect === "/logout") {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default store;
