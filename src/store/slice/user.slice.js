import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        cart: [],
        receipts: []
    },
    reducers: {
        setData: function(state, action) {
            return {
                ...state,
                data: action.payload
            }
        }
    }
})

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;