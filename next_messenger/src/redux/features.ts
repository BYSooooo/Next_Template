import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type toastType = {
    type : "error" | "info" | "confirm",
    openYn : boolean,
    title : string,
    content : string
}

export const toastSlice = createSlice({
    name : 'toastSlice',
    initialState : {
        type : "info",
        openYn : false,
        title : "",
        content : ""
    },
    reducers : {
        openMessageToast : (state, action:PayloadAction<toastType>)=> {
            state.type = action.payload.type,
            state.openYn = action.payload.openYn,
            state.title = action.payload.title,
            state.content = action.payload.content
        }   
    }
})

export const { openMessageToast } = toastSlice.actions

export default [
    toastSlice.reducer
]