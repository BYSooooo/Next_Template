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
        controlMessageToast : (state, action:PayloadAction<toastType>)=> {
            state.type = action.payload.type,
            state.openYn = action.payload.openYn,
            state.title = action.payload.title,
            state.content = action.payload.content
        }
    }
})
export const dialogSlice = createSlice({
    name : 'dialogSlice',
    initialState : {
        openYn : false,
        contentName : ""

    },
    reducers : {
        controlDialog : (state, action:PayloadAction<{openYn : boolean, contentName : string}>)=> {
            state.openYn = action.payload.openYn,
            state.contentName = action.payload.contentName
        }
    }
})

export const { controlMessageToast } = toastSlice.actions
export const { controlDialog } = dialogSlice.actions

export default [
    toastSlice.reducer,
    dialogSlice.reducer

]