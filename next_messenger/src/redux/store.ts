import { configureStore } from "@reduxjs/toolkit";
import { dialogSlice, toastSlice } from "./features";

export const makeStore = ()=> {
    return configureStore({
        reducer : {
            toastStore : toastSlice.reducer,
            dialogStore : dialogSlice.reducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];