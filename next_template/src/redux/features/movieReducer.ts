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

export const searchFilter = createSlice({
    name : 'searchFilter',
    initialState : [
        { name : "genre", useFilter : false },
        { name : "date" , useFilter : false },
        { name : "rate" , useFilter : false }
    ],
    reducers : {
        changeFilter : (state, action: PayloadAction<{name: String, useFilter : boolean}>) => {
            /** change Use Filtering Item  */
            const index = state.findIndex((item) => item.name === action.payload.name)
            state[index].useFilter = action.payload.useFilter
        }
    }
})

export const selectedDateRange = createSlice({
    name : 'selectedDateRange',
    initialState : [],
    reducers : {
        setDateRange : (state, action: PayloadAction<[]>) => {
            /** set Ranged Movie Release Date in Movie Main's Detail Button */
            state.push(action.payload)
        },
            /** delete Ranged Movie Release Date in Movie Main's Detail Button */
        delDateRange : (state, action: PayloadAction<[]>) => {
            state.splice(0);
        }
    }
})

export const { setPopularList } = popular.actions;
export const { setGenreList } = movieGenre.actions;
export const { setSelectedGenre, delSelectedGenre } = selectedGenre.actions;
export const { changeFilter } = searchFilter.actions;
export const { setDateRange, delDateRange } = selectedDateRange.actions; 


export default [popular.reducer, movieGenre.reducer, selectedGenre.reducer, selectedDateRange];