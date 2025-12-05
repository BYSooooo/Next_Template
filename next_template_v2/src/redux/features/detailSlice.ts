import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailState {
    openYn : boolean,
    component : string
}

const initialState : DetailState = {
    openYn : false,
    component : ""
}

export const detailSlice = createSlice({
    name : 'detail',
    initialState,
    reducers : {
        onOpenDetail: (state, action : PayloadAction<{component : string}>)=> { 
            state.openYn = true,
            state.component = action.payload.component
        },
        onCloseDetail : (state)=> { 
            state.openYn = false,
            state.component = ""
        }, 
    }
});

export const { onOpenDetail, onCloseDetail } = detailSlice.actions