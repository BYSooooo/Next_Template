import {configureStore} from '@reduxjs/toolkit';
import { 
        useDispatch as useDispatchBase, 
        useSelector as useSelectorBase
    } from 'react-redux';

const store = configureStore({
    reducer : {
       
    }
})

// Infer the 'RootState' and 'AppDispatch' types from the store inself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type : { }
type AppDispatch = typeof store.dispatch;
// Since we use typescript, lets utilize 'usedispatch'
export const useDispatch = () => useDispatchBase<AppDispatch>();
// and utilize 'useSelector'
export const useSelector = <TSelected = unknown> (
    selector : (state : RootState) => TSelected
) : TSelected => useSelectorBase<RootState, TSelected>(selector);

