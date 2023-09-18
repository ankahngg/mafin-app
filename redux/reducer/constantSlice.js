import { createSlice } from "@reduxjs/toolkit";

const dayLeft = function () {
    const date = new Date();
    const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.getDate() - date.getDate() + 1;
}

const date = new Date();
const Week = Math.ceil(date.getDate() / 7);
const Year = date.getFullYear();
const Month = date.getMonth() + 1;
const Dateth = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
const Leftth = dayLeft();
const Day = date.getDate();

const init = {
    Day, // Day now
    Week, // Week now
    Month, // Month now
    Year, // Year now
    Dateth, // Date now
    Leftth, // Day left

}

export const constantSlice = createSlice({
    name : 'constant',
    initialState : init,
    reducers : {
    }

})