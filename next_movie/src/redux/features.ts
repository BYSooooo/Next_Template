import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isSwitchStatement } from "typescript";

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
        name : ""
    },
    reducers : {
        controlDialog : (state, action : PayloadAction<{openYn : boolean, name : string}> )=> {
            state.openYn = action.payload.openYn;
            state.name = action.payload.name
        }
    }
})

export const { setTheme } = themeSlice.actions;
export const { controlDialog } = dialogSlice.actions;

export default [
    themeSlice.reducer,
    dialogSlice.reducer
]