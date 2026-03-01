import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    doneSuccess
} from './feeSlice';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export const createFee = (fields) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.post(`${BASE_URL}/api/admin/fees/create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(doneSuccess());
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const getStudentFees = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${BASE_URL}/api/student/fees/${id}`);
        if (result.data.empty) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const getAllFeesForAdmin = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${BASE_URL}/api/admin/fees/list`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};
