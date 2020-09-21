import * as SignupActionTypes from "./SignupScreen.types";

const initialState = {
    isLoggedin: false
};

export default function SignupReducer(state = initialState, action) {
    switch (action.type) {
        case SignupActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoggedin: action.value
            }
        default:
            return state;
    }
}

