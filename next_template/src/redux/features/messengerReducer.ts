import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatRoomInfo, RequestFriend, UserInfo } from "../../../msg_typeDef";
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
        block : [{type : "", uuid : ""}],
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

export const popOverToggleHook = createSlice({
    name : 'PopOverToggle',
    initialState : {
        showYn : false,
        messageString : "",
        type: "default"
    },
    reducers : {
        setPopOverToggle : (state, action: PayloadAction<{showYn : boolean, messageString? : string, type? : "default"|"success"|"fail"}>)=> {
            state.showYn = action.payload.showYn
            state.type = action.payload.type ??= 'default' 
            state.messageString = action.payload.messageString ??= ""

        },
        initPopOverToggle : (state)=> {
            state.showYn = false,
            state.messageString = ""
            state.type ="default"
        }
    }
})

export const selectTabUserManageHook = createSlice({
    name : 'UserManageTab',
    initialState : {
        selected : 1
    },
    reducers : {
        setSelectedTab : (state, action : PayloadAction<number>)=> {
            state.selected = action.payload
        }
    }
})

export const friendRequestListHook = createSlice({
    name : 'FriendRequestHook',
    initialState : [],
    reducers : {
        setFriendReq : (state, action: PayloadAction<RequestFriend[]>)=> {
            state.length = 0
            state.push(...action.payload)   
        }
    }
})

export const { setPageRendering } = routerHook.actions;
export const { setUserInfo } = userInfoHook.actions;
export const { setCurrentUserInfo } = currentUserInfoHook.actions;
export const { setChatListUUID, setChatListInfo } = currentChatInfoHook.actions;
export const { setPopOverToggle,initPopOverToggle } = popOverToggleHook.actions;
export const { setSelectedTab } = selectTabUserManageHook.actions;
export const { setFriendReq } = friendRequestListHook.actions;

export default [
    routerHook.reducer,
    userInfoHook.reducer,
    currentUserInfoHook.reducer,
    currentChatInfoHook.reducer,
    popOverToggleHook.reducer,
    selectTabUserManageHook.reducer,
    friendRequestListHook.reducer
]
