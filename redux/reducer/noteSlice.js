import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import addData from "../../src/storage/note/addData";
import removeData from "../../src/storage/note/removeData";
import getData from "../../src/storage/note/getData";


const init = {
    in : {
        crid : 0,
        list : []
    },
    out : {
        crid : 0,
        list :[]
    }
}

export const noteSlice = createSlice({
    name : 'note',
    initialState : init,
    reducers : {
    },
    extraReducers : builder => {
        builder
        .addCase(addShortNote.fulfilled, (state,action) => {
            payload = action.payload;
            if(payload.KIND == 'Out') {
                id = state.out.crid + 1;
                state.out.list.push({ID : id, NAME : payload.NAME});
                state.out.crid ++;
            }
            else {
                id = state.in.crid + 1;
                state.in.list.push({ID : id, NAME : payload.NAME});
                state.in.crid ++;
            }
        })
        .addCase(removeShortNote.fulfilled, (state,action) => {
            payload = action.payload;
            if(payload.KIND == 'Out') {
                state.out.list = state.out.list.filter((val,index) => {
                    return val.ID != payload.ID;
                })
            }
            else {
                state.in.list = state.in.list.filter((val,index) => {
                    return val.ID != payload.ID;
                })
            }
        })
        .addCase(fetchNoteData.fulfilled, (state,action) =>  {
            state.in = action.payload.in;
            state.out = action.payload.out;
        })
    }
})

export const fetchNoteData = createAsyncThunk('fetchNoteData',async () => {
    res = await getData();
    return res;
})

export const addShortNote = createAsyncThunk('addShortNote',async (note) => {
    addData(note);
    return note;
})

export const removeShortNote = createAsyncThunk('removeShortNote',async (note) => {
    removeData(note);
    return note;
})