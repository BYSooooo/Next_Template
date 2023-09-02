import { configureStore } from '@reduxjs/toolkit';
import { detailCompanyInfo, detailModalControl, discoverFilter, movieDetail, movieGenre, popular, searchFilter, searchResult, selectedDateRange, selectedGenre, selectedRateRange } from './features/movieReducer';

export const store = configureStore({
    reducer : {
        moviePopular : popular.reducer,
        movieGenre : movieGenre.reducer,

        discoverFilter : discoverFilter.reducer,
        selectedGenre : selectedGenre.reducer,
        selectedDateRange : selectedDateRange.reducer,
        selectedRateRange : selectedRateRange.reducer,

        searchFilter : searchFilter.reducer,
        searchResult : searchResult.reducer,

        movieDetail : movieDetail.reducer,
        detailModal : detailModalControl.reducer,
        companyDetail : detailCompanyInfo.reducer
    }
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;