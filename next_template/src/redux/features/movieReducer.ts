import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export const popular = createSlice({
    name : 'moviePopularReducer',
    initialState : [],
    reducers : {
        setPopularList : (state, action : PayloadAction<[{}]>) => {
            // Popular Movie List Add Logic
            state.push(...action.payload)
        }
    }
})
export const movieGenre = createSlice({
    name : 'movieGenreList',
    initialState : [],
    reducers : {
        setGenreList : (state, action : PayloadAction<[{}]>) => {
            state.push(...action.payload)
        }
    }
})


export const { setPopularList } = popular.actions;
export const { setGenreList } = movieGenre.actions;

export default [popular.reducer, movieGenre.reducer];