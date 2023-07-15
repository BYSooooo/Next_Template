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
            /** Movie Genre Id & Name */
            state.push(...action.payload)
        }
    }
})
export const selectedGenre = createSlice({
    name :'selectedGenre',
    initialState : [],
    reducers : {
        setSelectedGenre : (state, action: PayloadAction<{}>) => {
            /** set Selected Movie Genre in Movie Main's Detail Button */
            state.push(action.payload)
        },
        delSelectedGenre : (state, action: PayloadAction<number>) => {
            state.splice((state.findIndex(genre => genre.id === action.payload)), 1);
        }
        
     }
})


export const { setPopularList } = popular.actions;
export const { setGenreList } = movieGenre.actions;
export const { setSelectedGenre, delSelectedGenre } = selectedGenre.actions;

export default [popular.reducer, movieGenre.reducer, selectedGenre.reducer];