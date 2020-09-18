import * as LoginActionTypes from "./LoginScreen.types";

 export function loginSuccess(value) {
    return {
      type: LoginActionTypes.LOGIN_SUCCESS,
      value
    }
  }
