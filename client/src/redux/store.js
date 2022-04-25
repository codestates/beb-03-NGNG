import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import tagReducer from './tag';

export default configureStore({
  reducer: {
    user: userReducer,
    tag: tagReducer
  }
});