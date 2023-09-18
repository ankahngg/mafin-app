import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getData from "../../src/storage/data/getData";
import addData from "../../src/storage/data/addData";
import removeData from "../../src/storage/data/removeData";

/*
    list : {
        year : {
            month : {
                list : [
                    {
                        DATE : 
                        MONEY :
                        KIND :
                        NOTE :
                    }
                ],
                summonth : {
                    IN :
                    OUT :
                },
                sumweek : {
                    week1 : {
                        IN :
                        OUT :
                    }
                    ...
                }
            }
            ...
        },
        ...
    }
*/
const date = new Date();
const Year = date.getFullYear();
const len = 2;


var init={
    status : 'idle',
    main : {}
};

for(let i=Year; i >= Year-len+1; i--) {
    init.main[`year${i}`] = {}
    for(let j=1;j<=12;j++) {
        init.main[`year${i}`][`month${j}`] = {
            crid : 0
            ,
            weeksum : {
                week1:{
                    IN:0,
                    OUT:0,
                },
                week2:{
                    IN:0,
                    OUT:0,
                },
                week3:{
                    IN:0,
                    OUT:0,
                },
                week4:{
                    IN:0,
                    OUT:0,
                },
                week5:{
                    IN:0,
                    OUT:0,
                },

            },
            monthsum: {
                IN:0,
                OUT:0,
            },
            list : [
                {
                    ID:1,
                    DATE:'12-5-2022',
                    MONEY:'100',
                    KIND :'Out',
                    NOTE :'buy food'
                }
            ]
        }
    }
}

export const dataSlice = createSlice({
    name : 'data',
    initialState : init,
    reducers : {

    }
    ,
    extraReducers : builder => {
        builder
        // .addCase(fetchData.pending, (state,action) => {
        //     state.status = 'loading';
        // })
        .addCase(fetchData.fulfilled, (state,action) => {
            state.main = action.payload;
            state.status = 'idle';
        })
        .addCase(addNote.fulfilled,(state,action) => {
            
            payload = action.payload;
            const arr = payload.DATE.split('-');
            const day = arr[0]; 
            const month = arr[1];
            const year = arr[2];
            const weekth = Math.ceil(day/7);
            payload.ID = state.main[`year${year}`][`month${month}`].crid + 1;
            state.main[`year${year}`][`month${month}`].list.push(payload);
            state.main[`year${year}`][`month${month}`].crid ++;
            if(payload.KIND == 'Out') {
                state.main[`year${year}`][`month${month}`].monthsum.OUT += payload.MONEY;
                state.main[`year${year}`][`month${month}`].weeksum[`week${weekth}`].OUT += payload.MONEY;
            }
            else {
                state.main[`year${year}`][`month${month}`].monthsum.IN += payload.MONEY;
                state.main[`year${year}`][`month${month}`].weeksum[`week${weekth}`].IN += payload.MONEY;
            }
            //console.log(state.main[`year${year}`][`month${month}`].list);
        })
        .addCase(removeNote.fulfilled,(state,action) => {
            payload = action.payload;
            const arr = payload.DATE.split('-');
            const day = arr[0]; 
            const month = arr[1];
            const year = arr[2];
            const weekth = Math.ceil(day/7);
            const tmp = state.main[`year${year}`][`month${month}`].list;
            
            
            state.main[`year${year}`][`month${month}`].list = tmp.filter((val,index) => {
                return val.ID != payload.ID;
            })

            if(payload.KIND == 'Out') {
                state.main[`year${year}`][`month${month}`].monthsum.OUT -= payload.MONEY;
                state.main[`year${year}`][`month${month}`].weeksum[`week${weekth}`].OUT -= payload.MONEY;
            }
            else {
                state.main[`year${year}`][`month${month}`].monthsum.IN -= payload.MONEY;
                state.main[`year${year}`][`month${month}`].weeksum[`week${weekth}`].IN -= payload.MONEY;
            }

        })
    }
})

async function sleep(ms) {
    return new Promise((resolve,reject) => {
        setTimeout(() => resolve(),ms);
    })
}

export const fetchData = createAsyncThunk('fetchData', async () => {
    const data = await getData();
    return data;
});

export const addNote = createAsyncThunk('addNote',async (note) => {
    addData(note);
    return note;
})

export const removeNote = createAsyncThunk('removeNote', async (note) => {
    removeData(note);
    return note;
})



