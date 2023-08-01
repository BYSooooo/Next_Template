import { configureStore } from '@reduxjs/toolkit';
import { discoverFilter, movieGenre, popular, searchFilter, selectedDateRange, selectedGenre, selectedRateRange } from './features/movieReducer';

export const store = configureStore({
    reducer : {
        moviePopular : popular.reducer,
        movieGenre : movieGenre.reducer,

        discoverFilter : discoverFilter.reducer,
        selectedGenre : selectedGenre.reducer,
        selectedDateRange : selectedDateRange.reducer,
        selectedRateRange : selectedRateRange.reducer,

        searchFilter : searchFilter.reducer
    }
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;