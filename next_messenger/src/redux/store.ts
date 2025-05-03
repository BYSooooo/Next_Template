import { configureStore } from "@reduxjs/toolkit";
import { chatSlice, dialogSlice, pageSlice, toastSlice, userInfoSlice } from "./features";

export const makeStore = ()=> {
    return configureStore({
        reducer : {
            toastStore : toastSlice.reducer,
            dialogStore : dialogSlice.reducer,
            pageStore : pageSlice.reducer,
            userStore : userInfoSlice.reducer,
            chatStore : chatSlice.reducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];