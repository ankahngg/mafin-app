import { createSlice } from "@reduxjs/toolkit";

const date = new Date();
const Week = Math.ceil(date.getDate() / 7);
const Year = date.getFullYear();
const Month = date.getMonth() + 1;
const Day = date.getDate();

const init = {
    CrKind : 'Out',
    CrPage : 'Month',
    CrFocus : Week,
    CrYear: Year,
    CrMonth: Month,
    Loader : false,
    CrDay : Day,
}

export const stateSlice = createSlice({
    name : 'state',
    initialState : init,
    reducers : {
        setCrPage : (state,action) => {
            state.CrPage = action.payload;
        },
        setCrYear : (state,action) => {
            state.CrYear = action.payload;
        },
        setCrMonth : (state,action) => {
            state.CrMonth = action.payload;
        },
        setLoader : (state,action) => {
            state.Loader = action.payload;
        },
        setCrFocus : (state,action) => {
            state.CrFocus = action.payload;
        },
        setCrKind : (state,action) => {
            state.CrKind = action.payload;
        },
        setCrDay : (state,action) => {
            state.CrDay = action.payload;
        }
    }

})