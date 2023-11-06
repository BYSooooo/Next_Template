import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const routerHook = createSlice({
    name : 'MessengerRouter',
    initialState : {pageName : "Default", title : "Home"},
    reducers : {
        /* Selected Page View in Messenger Page */
        setPageRouter : (state, action : PayloadAction<{page : string, title : string}>) => {
            state.pageName = action.payload.page
            state.title = action.payload.title
        }

    }
})

export const userInfoHook = createSlice({
    name : 'UserInfoEdit',
    initialState : [
        { infoName : "Email", value : "", editYn : false },
        { infoName : "DisplayName", value : "", editYn : false},
        
    ],
    reducers : {
        /* Edit User Info in Messneger Page */
        editUserInfo : (state, action : PayloadAction<{infoName : "Email" | "DisplayName", value : string, editYn : boolean }>) => {
            const index = state.findIndex((item) => item.infoName === action.payload.infoName);
            state[index].value  = action.payload.value;
            state[index].editYn = action.payload.editYn;
        }
    }
})

export const { setPageRouter } = routerHook.actions;
export const { editUserInfo } = userInfoHook.actions;

export default [
    routerHook.reducer,
    userInfoHook.reducer
]
