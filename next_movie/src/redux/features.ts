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

export const { setTheme } = themeSlice.actions;

export default [
    themeSlice.reducer
]