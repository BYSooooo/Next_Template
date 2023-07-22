import { configureStore } from '@reduxjs/toolkit';
import { movieGenre, popular, searchFilter, selectedDateRange, selectedGenre, selectedRateRange } from './features/movieReducer';

export const store = configureStore({
    reducer : {
        moviePopular : popular.reducer,
        movieGenre : movieGenre.reducer,
        selectedGenre : selectedGenre.reducer,
        selectedDateRange : selectedDateRange.reducer,
        searchFilter : searchFilter.reducer,
        selectedRateRange : selectedRateRange.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;