import { configureStore } from '@reduxjs/toolkit'
import { dialogSlice, genreSlice, searchSlice, themeSlice } from './features'

export const makeStore = () => {
  return configureStore({
    reducer: {
      themeReducer : themeSlice.reducer,
      dialogReducer : dialogSlice.reducer,
      genreReducer : genreSlice.reducer,
      searchReducer : searchSlice.reducer
    
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']