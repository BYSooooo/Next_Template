import { configureStore } from '@reduxjs/toolkit';
import { detailCompanyInfo, detailModalControl, discoverFilter, movieDetail, popular, searchFilter, searchResult, selectedDateRange, selectedGenre, selectedRateRange } from './features/movieReducer';
import { routerHook } from './features/messengerReducer';

export const store = configureStore({
    reducer : {
        moviePopular : popular.reducer,

        discoverFilter : discoverFilter.reducer,
        selectedGenre : selectedGenre.reducer,
        selectedDateRange : selectedDateRange.reducer,
        selectedRateRange : selectedRateRange.reducer,

        searchFilter : searchFilter.reducer,
        searchResult : searchResult.reducer,

        movieDetail : movieDetail.reducer,
        detailModal : detailModalControl.reducer,
        companyDetail : detailCompanyInfo.reducer,

        messenger : routerHook.reducer
    }
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;