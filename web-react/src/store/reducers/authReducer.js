import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    msg: '',
    update: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                msg: '',
            };

        case actionTypes.LOGIN_FAIL:
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                msg: action.data, // Use error message from action
                update: !state.update, // Toggle update state
            };

        case actionTypes.VERIFY_SUCCESS:
            return {
                ...state,
                msg: action.data, // Message from verification success
            };

        case actionTypes.VERIFY_FAIL:
            return {
                ...state,
                msg: action.data, // Message from verification failure
            };

        case actionTypes.RESEND_CODE_SUCCESS:
            return {
                ...state,
                msg: action.data, // Message from resending verification code success
            };

        case actionTypes.RESEND_CODE_FAIL:
            return {
                ...state,
                msg: action.data, // Message from resending verification code failure
            };

        case actionTypes.LOGOUT:
            return {
                ...initialState, // Reset state to initial on logout
            };

        default:
            return state; // Return current state for unhandled actions
    }
};

export default authReducer;