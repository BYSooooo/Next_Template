import DetailMain from "@/movie/layouts/DetailMain";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const popular = createSlice({
    name : 'moviePopularReducer',
    initialState : [],
    reducers : {
         /** Popular Movie List Add Logic */ 
        setPopularList : (state, action : PayloadAction<[{}]>) => {
            state.splice(0,state.length, ...action.payload)
        }
    }
})
export const movieGenre = createSlice({
    name : 'movieGenreList',
    initialState : [],
    reducers : {
        /** Movie Genre Id & Name */
        setGenreList : (state, action : PayloadAction<[{}]>) => {
            state.push(0,state.length, ...action.payload)
        }
    }
})

/** Discover Filter Control Part */
export const discoverFilter = createSlice({
    name : 'discoverFilter',
    initialState : [
        { name : "genre", useFilter : false },
        { name : "date" , useFilter : false },
        { name : "rate" , useFilter : false }
    ],
    reducers : {
        /** change Use Filtering Item  */
        changeFilter : (state, action: PayloadAction<{name: string, useFilter : boolean}>) => {
            const index = state.findIndex((item) => item.name === action.payload.name)
            state[index].useFilter = action.payload.useFilter
        }
    }
})

export const selectedGenre = createSlice({
    name :'selectedGenre',
    initialState : [],
    reducers : {
        /** set Selected Movie Genre in Movie Main's Detail Button */
        setSelectedGenre : (state, action: PayloadAction<{}>) => {
            state.push(action.payload)
        },
        /** delete Selected Movie Genre in Movie Main's Detail Button */
        delSelectedGenre : (state, action: PayloadAction<number>) => {
            state.splice((state.findIndex(genre => genre.id === action.payload)), 1);
        }
        
     }
})

export const selectedDateRange = createSlice({
    name : 'selectedDateRange',
    initialState : [
        { name : "fromDate", date: dayjs(new Date()).format('YYYY-MM-DD')} ,
        { name : "toDate", date : dayjs(new Date()).format('YYYY-MM-DD')}      
    ],
    reducers : {
        setSelectedFromDate : (state, action : PayloadAction<string>) => {
            state[0].date = action.payload
            
        },
        setSelectedToDate : (state, action : PayloadAction<string>)=> {
            state[1].date = action.payload
        }
    }
})

export const selectedRateRange = createSlice({
    name : 'selectedRateRange',
    initialState : [0,10],
    reducers : {
         /** Set Movies' Rate in Movie Main's Detail Button */
        setRateRange : (state, action: PayloadAction<number[]>) => {
            state.splice(0,2,...action.payload);
        }
    }
})

/** Search Criteria Control Part  */
export const searchFilter = createSlice({
    name : 'searchFilter',
    initialState : [
        { name : "year"  , useFilter : false, value : ''    },
        { name : "adult" , useFilter : false, value : ''    },
        { name : "keyword", useFilter : true, value : ''    }
    ],
    reducers : {
        changeUseYn : (state, action: PayloadAction<{name : string, useFilter : boolean }>)=> {
            const index = state.findIndex((item)=> item.name === action.payload.name);
            state[index].useFilter = action.payload.useFilter
        },
        changeValue : (state, action: PayloadAction<{name: string, value : string}>)=> {
            const index = state.findIndex((item)=> item.name === action.payload.name);
            state[index].value = action.payload.value;
        }
    }
})

export const searchResult = createSlice({
    name : 'searchResult',
    initialState : [],
    reducers : {
        /** Searching First Time */
        setSearchResult : (state, action: PayloadAction<SearchMovie[]>)=> {
            state.splice(0,state.length,action.payload);
        },
        /** Searching Second and More Time by Scrolling Under Screen */
        addSearchResult : (state, action: PayloadAction<SearchMovie[]>)=> {
            state.push(action.payload)
        }
    }
})

export const movieDetail = createSlice({
    name : 'movieDetail',
    initialState : [],
    reducers : {
        /** set State Detail Movie Info  */
        setDetailInfo : (state, action: PayloadAction<MovieDetail>)=> {
            state.splice(0, state.length, action.payload)
        }
    }

})

export const detailModalControl = createSlice({
    name : 'detailModal',
    initialState : { name : "" , openYn : false, value : [] },
    reducers : {
        /** set State Detail Modal Open */
        openDetailModal : (state, action : PayloadAction<{name : "Cast" | "Videos" | "Images" | "", value : number | ImageInfo | VideoInfo[]}>) => {
            state.name = action.payload.name;
            state.openYn = true
            state.value.push(action.payload.value)
        },
        /** set State Detail Modal Close */
        closeDetailModal : (state, action : PayloadAction) => {
            state.name = "";
            state.openYn = false
            state.value = []

        }
    }
})


export const { setPopularList } = popular.actions;
export const { setGenreList } = movieGenre.actions;

export const { changeFilter } = discoverFilter.actions;
export const { setSelectedGenre, delSelectedGenre } = selectedGenre.actions;
export const { setSelectedFromDate, setSelectedToDate } = selectedDateRange.actions;
export const { setRateRange } = selectedRateRange.actions; 

export const { changeUseYn, changeValue } = searchFilter.actions;
export const { setSearchResult, addSearchResult } = searchResult.actions;

export const { setDetailInfo } = movieDetail.actions;

export const { openDetailModal, closeDetailModal } = detailModalControl.actions;

export default 
    [
        popular.reducer, 
        movieGenre.reducer, 
        
        discoverFilter.reducer,
        selectedGenre.reducer, 
        selectedDateRange,
        selectedRateRange.reducer,

        searchFilter.reducer,
        detailModalControl.reducer
        
    ];