import { configureStore } from '@reduxjs/toolkit';
import { popular } from './features/movieReducer';

export const store = configureStore({
    reducer : {
        moviePopular : popular.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;