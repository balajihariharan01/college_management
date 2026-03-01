import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feesList: [],
    loading: false,
    error: null,
    response: null,
    status: 'idle'
};

const feeSlice = createSlice({
    name: 'fee',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.feesList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        underControl: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.status = 'idle';
        },
        doneSuccess: (state) => {
            state.status = 'added';
            state.loading = false;
            state.error = null;
            state.response = null;
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    underControl,
    doneSuccess
} = feeSlice.actions;

export const feeReducer = feeSlice.reducer;
