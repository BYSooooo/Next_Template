import { createSlice } from "@reduxjs/toolkit";

export const popular = createSlice({
    name : 'moviePopularReducer',
    initialState : [],
    reducers : {
        set : (state) => {
            // Popular Movie List Add Logic
        },
        get : (state) => {

        }
    }
})

export const {
    set
} = popular.actions;

