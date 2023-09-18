import {configureStore} from '@reduxjs/toolkit';
import { stateSlice } from './reducer/stateSlice';
import { constantSlice } from './reducer/constantSlice';
import { statisticSlice } from './reducer/statisticSlice';
import { dataSlice } from './reducer/dataSlice';
import { noteSlice } from './reducer/noteSlice';

export const store = configureStore({
    reducer : {
        constant : constantSlice.reducer,
        state : stateSlice.reducer,
        statistic : statisticSlice.reducer,
        data : dataSlice.reducer,
        note : noteSlice.reducer,
    }
})