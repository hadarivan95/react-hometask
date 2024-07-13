import { configureStore } from '@reduxjs/toolkit';
import {  persistStore } from 'redux-persist';
import listReducer from './listReducer';


export const store = configureStore({
  reducer: {
    list: listReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);
