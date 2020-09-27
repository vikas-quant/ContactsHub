import * as ProfileScreenTypes from "./ProfileScreen.types";

 export function registerUserProfile(user, data) {
    return {
      type: ProfileScreenTypes.PROFILE_SUCCESS,
      user,
      data
    }
  }
