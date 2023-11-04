import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const routerHook = createSlice({
    name : 'MessengerRouter',
    initialState : {pageName : "Default"},
    reducers : {
        /* Selected Page View in Messenger Page */
        setPageRouter : (state, action : PayloadAction<{name : string}>) => {
            state.pageName = action.payload.name
        }

    }
})

export const { setPageRouter } = routerHook.actions;

export default [
    routerHook.reducer
]
