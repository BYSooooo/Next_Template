import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name : 'themeReducer',
    initialState : {theme : false},
    reducers : {
        /**
         * Set Theme
         * 
         * `true` use DarkMode / `false` use LightMode
         */
        setTheme : (state,action : PayloadAction<{theme : boolean}>)=> {
            state.theme = action.payload.theme
        }
    }
})
export const dialogSlice = createSlice({
    name : 'dialogReducer',
    initialState : { 
        openYn : false,
        name : "",
        extraInfo : {} as any
    },
    reducers : {
        controlDialog : (state, action : PayloadAction<{openYn : boolean, name : string, extraInfo?: any}> )=> {
            state.openYn = action.payload.openYn
            state.name = action.payload.name
            if(action.payload.extraInfo) state.extraInfo = action.payload.extraInfo
        }
    }
})

export const genreSlice = createSlice({
    name : 'genreReducer',
    initialState : []  as Genre[],
    reducers : {
        initGenreList : (state, action : PayloadAction<Genre[]>)=> {
            state.push(...action.payload)
        }
    }
})

export const searchSlice = createSlice({
    name : 'searchReducer',
    initialState : {
        movie : { page : 0, results : []  ,total_pages : 0, total_results : 0 },
        person : { page : 0, results : []  ,total_pages : 0, total_results : 0 },
        company : { page : 0, results : []  ,total_pages : 0, total_results : 0 },
        collection : { page : 0, results : []  ,total_pages : 0, total_results : 0 }
    },
    reducers : {
        setSearchResult : (state, action : PayloadAction<any>) => {
            state.movie = action.payload.movie
            state.person = action.payload.person
            state.company = action.payload.company
            state.collection = action.payload.collection
        }
    }
})

export const searchKeywordSlice = createSlice({
    name : 'keywordReducer',
    initialState : "",
    reducers : {
        // Set Keyword
        setSearchKeyword : (state, action : PayloadAction<string>) => {
            state = action.payload
        }
    }
})

export const { setTheme } = themeSlice.actions;
export const { controlDialog } = dialogSlice.actions;
export const { initGenreList } = genreSlice.actions;
export const { setSearchResult } = searchSlice.actions;
export const { setSearchKeyword } = searchKeywordSlice.actions;

export default [
    themeSlice.reducer,
    dialogSlice.reducer,
    genreSlice.reducer,
    searchSlice.reducer,
    searchKeywordSlice.reducer
]