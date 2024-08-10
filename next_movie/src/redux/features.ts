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

export const { setTheme } = themeSlice.actions;
export const { controlDialog } = dialogSlice.actions;
export const { initGenreList } = genreSlice.actions;

export default [
    themeSlice.reducer,
    dialogSlice.reducer,
    genreSlice.reducer
]