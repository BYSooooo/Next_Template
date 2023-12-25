import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../../msg_typeDef";
import { FieldValue, Timestamp } from "firebase/firestore";

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

export const currentUserInfoHook = createSlice({
    name : 'CurrentUserInfo',
    initialState : {
        email : "",
        displayName : "",
        emailVerified : false,
        friendList : [],
        photoURL : "",
        uid : "",
        lastLogin : new Date()
    },
    reducers : {
        setCurrentUserInfo : (state,action : PayloadAction<UserInfo>)=> {
            state = action.payload
        }
    }
})

export const { setPageRouter } = routerHook.actions;
export const { setUserInfo } = userInfoHook.actions;
export const { setCurrentUserInfo } = currentUserInfoHook.actions;

export default [
    routerHook.reducer,
    userInfoHook.reducer,
    currentUserInfoHook.reducer

]
