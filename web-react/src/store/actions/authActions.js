import actionTypes from './actionTypes';
import { login as apiLogin, register as apiRegister, verifyCode as apiVerifyCode, resendVerificationCode as apiResendCode } from '../../services/auth';

// Action creator for user login
export const login = (account, password) => async (dispatch) => {
    try {
        const data = await apiLogin(account, password);
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            data: data.token, 
        });
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: error.message, // Use the error message from API
        });
    }
};

// Action creator for user registration
export const register = (userData) => async (dispatch) => {
    try {
        const data = await apiRegister(userData);
        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            data: data.token, // Adjust according to your API response
        });
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: error.message, // Use the error message from API
        });
    }
};

// Action creator for verifying code
export const verify = (email, verificationCode) => async (dispatch) => {
    try {
        const data = await apiVerifyCode(email, verificationCode);
        dispatch({
            type: actionTypes.VERIFY_SUCCESS,
            data: data.message, // Adjust according to your API response
        });
    } catch (error) {
        dispatch({
            type: actionTypes.VERIFY_FAIL,
            data: error.message,
        });
    }
};

// Action creator for resending verification code
export const resendCode = (email) => async (dispatch) => {
    try {
        const data = await apiResendCode(email);
        dispatch({
            type: actionTypes.RESEND_CODE_SUCCESS,
            data: data.message, // Adjust according to your API response
        });
    } catch (error) {
        dispatch({
            type: actionTypes.RESEND_CODE_FAIL,
            data: error.message,
        });
    }
};
export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('token'); // Remove token from local storage
        dispatch({ type: actionTypes.LOGOUT });
    };
};