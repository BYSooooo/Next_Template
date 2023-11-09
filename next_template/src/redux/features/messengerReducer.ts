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
        { infoName : "email", value : "", editYn : false },
        { infoName : "password", value : "", editYn : false},
        { infoName : "displayName", value : "", editYn : false},
        { infoName : "photoURL", value : "", editYn : false},
        { infoName : "phoneNumber", value : "", editYn: false}
        
    ],
    reducers : {
        /* Edit User Info in Messneger Page */
        setUserInfo : (state, action : PayloadAction<{infoName : string, value? : string, editYn? : boolean }>) => {
            const index = state.findIndex((item) => item.infoName === action.payload.infoName);
            if(action.payload.value !== undefined || null) state[index].value = action.payload.value;
            if(action.payload.editYn !== undefined || null) state[index].editYn = action.payload.editYn;
        }
    }
})

export const { setPageRouter } = routerHook.actions;
export const { setUserInfo } = userInfoHook.actions;

export default [
    routerHook.reducer,
    userInfoHook.reducer
]
