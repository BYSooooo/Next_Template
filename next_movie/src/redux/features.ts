import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name : 'themeReducer',
    initialState : {theme : ''},
    reducers : {
        setTheme : (state,action : PayloadAction<{theme : string}>)=> {
            state.theme = action.payload.theme
        }
    }

})

export const { setTheme } = themeSlice.actions;

export default [
    themeSlice.reducer
]