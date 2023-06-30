import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export const popular = createSlice({
    name : 'moviePopularReducer',
    initialState : [{}],
    reducers : {
        setList : (state, action : PayloadAction<[{}]>) => {
            state.splice(0,1)
            // Popular Movie List Add Logic
            state.push(action.payload)
        }
    }
})


export const {
    setList
} = popular.actions;

export default popular.reducer;

