import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailState {
    openYn : boolean,
    component : string,
    url : string
}

const initialState : DetailState = {
    openYn : false,
    component : "",
    url : null
}

export const detailSlice = createSlice({
    name : 'detail',
    initialState,
    reducers : {
        onOpenDetail: (state, action : PayloadAction<{component : string, url : string}>)=> { 
            state.openYn = true,
            state.component = action.payload.component
            state.url = action.payload.url
        },
        onCloseDetail : (state)=> { 
            state.openYn = false,
            state.component = ""
            state.url = null
        }, 
    }
});

export const { onOpenDetail, onCloseDetail } = detailSlice.actions