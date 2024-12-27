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
        contentName : "",
        size : "",
        title : "",
    },
    reducers : {
        controlDialog : (state, action:PayloadAction<{openYn : boolean, contentName : string, size : string, title: string}>)=> {
            state.openYn = action.payload.openYn
            state.contentName = action.payload.contentName
            state.size = action.payload.size
            state.title = action.payload.title
        }
    }
})

export const pageSlice = createSlice({
    name : 'pageSlice',
    initialState : {
        middle : '',
        right : '',
    },
    reducers : {
        controlPageLayout : (state, action: PayloadAction<{middle? :string, right? : string}>)=> {
            if(action.payload.middle) state.middle = action.payload.middle;
            if(action.payload.right) state.right = action.payload.right;
        }
    }
})

export const { controlMessageToast } = toastSlice.actions
export const { controlDialog } = dialogSlice.actions
export const { controlPageLayout } = pageSlice.actions

export default [
    toastSlice.reducer,
    dialogSlice.reducer,
    pageSlice.reducer
]