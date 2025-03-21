import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type toastType = {
    type : "error" | "info" | "confirm",
    openYn : boolean,
    title : string,
    content : string
}

export const toastSlice = createSlice({
    name : 'toastSlice',
    initialState : {
        type : "info",
        openYn : false,
        title : "",
        content : ""
    },
    reducers : {
        controlMessageToast : (state, action:PayloadAction<toastType>)=> {
            state.type = action.payload.type,
            state.openYn = action.payload.openYn,
            state.title = action.payload.title,
            state.content = action.payload.content
        }
    }
})
export const dialogSlice = createSlice({
    name : 'dialogSlice',
    initialState : {
        openYn : false,
        contentName : "",
        size : "",
        title : "",
        extraData : null
    },
    reducers : {
        controlDialog : (state, action:PayloadAction<{openYn : boolean, contentName : string, size : string, title: string, extraData? : any}>)=> {
            state.openYn = action.payload.openYn
            state.contentName = action.payload.contentName
            state.size = action.payload.size
            state.title = action.payload.title
            if(action.payload.extraData) state.extraData = action.payload.extraData
        }
    }
})

export const pageSlice = createSlice({
    name : 'pageSlice',
    initialState : {
        sideNavIndex : 0,
        left : '',
        middle : '',
        right : '',
    },
    reducers : {
        controlPageLayout : (state, action: PayloadAction<{sideNavIndex? : number, left : string, middle :string, right : string}>)=> {
            if(action.payload.sideNavIndex) state.sideNavIndex = action.payload.sideNavIndex
            state.left = action.payload.left;
            state.middle = action.payload.middle;
            state.right = action.payload.right;
        }
    }
})

export const userInfoSlice = createSlice({
    name : 'userInfoSlice',
    initialState: {
        email: '',
        displayName : '',
        emailVerified : '',
        avatarImg : '',
        avatarOpenYn : false,
        requested : [],
        received : [],
    } ,
    reducers : {
        setUserInfo: (state, action: PayloadAction<UserInfo>)=> {
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.emailVerified = action.payload.emailVerified;
            state.avatarImg = action.payload.avatarImg;
            state.avatarOpenYn = action.payload.avatarOpenYn;
            state.requested = action.payload.requested;
            state.received = action.payload.received;
        }
    }

})

export const { controlMessageToast } = toastSlice.actions
export const { controlDialog } = dialogSlice.actions
export const { controlPageLayout } = pageSlice.actions
export const { setUserInfo } = userInfoSlice.actions

export default [
    toastSlice.reducer,
    dialogSlice.reducer,
    pageSlice.reducer,
    userInfoSlice.reducer
]