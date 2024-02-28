import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatRoomInfo, UserInfo } from "../../../msg_typeDef";
import { Timestamp } from "firebase/firestore";

export const routerHook = createSlice({
    name : 'MessengerPage',
    initialState : {title : "Home", left : "", middle : "", right : ""},
    reducers: {
        /* Page setting in Messenger Page */
        setPageRendering : (state, action : PayloadAction<{title?: string, left? : string, middle?: string, right?: string}>)=> {
            if(action.payload.title) state.title = action.payload.title;
            if(action.payload.left) state.left = action.payload.left;
            if(action.payload.middle) state.middle = action.payload.middle;
            if(action.payload.right) state.right = action.payload.right;
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
        { infoName : "phoneNumber", value : "", editYn: false},
        { infoName : "introduction", value : "", editYn : false}
        
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
        block : [{blockUser : "", blockedDate : null}],
        lastLogin : "",
        introduction : ""
    },
    reducers : {
        setCurrentUserInfo : (state,action : PayloadAction<UserInfo>)=> 
            state = action.payload 
    }
})

export const currentChatInfoHook = createSlice({
    name : 'CurrentChatInfo',
    initialState : {
        uuid : "",
        friendListUUID : "",
        lastChat : "",
        members : []
    },
    reducers : {
        setChatListUUID : (state,action:PayloadAction<string>)=> {
            state.uuid = action.payload
        },
        setChatListInfo : (state,action : PayloadAction<ChatRoomInfo>)=>{
            state = action.payload
        },
        
    }
})

export const { setPageRendering } = routerHook.actions;
export const { setUserInfo } = userInfoHook.actions;
export const { setCurrentUserInfo } = currentUserInfoHook.actions;
export const { setChatListUUID, setChatListInfo } = currentChatInfoHook.actions;

export default [
    routerHook.reducer,
    userInfoHook.reducer,
    currentUserInfoHook.reducer,
    currentChatInfoHook.reducer

]
