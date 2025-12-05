import { configureStore } from "@reduxjs/toolkit";
import { detailSlice } from "./features/detailSlice";

export const makeStore= ()=> {
    return configureStore({
        reducer : {
            detailSlice : detailSlice.reducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']