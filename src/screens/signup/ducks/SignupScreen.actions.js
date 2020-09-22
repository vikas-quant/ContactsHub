import * as SignupTypes from "./SignupScreen.types";

 export function signupSuccess(value) {
    return {
      type: SignupTypes.SIGNUP_SUCCESS,
      value
    }
  }
