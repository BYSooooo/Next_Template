import { configureStore } from '@reduxjs/toolkit';
import { movieGenre, popular, selectedGenre } from './features/movieReducer';

export const store = configureStore({
    reducer : {
        moviePopular : popular.reducer,
        movieGenre : movieGenre.reducer,
        selectedGenre : selectedGenre.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;