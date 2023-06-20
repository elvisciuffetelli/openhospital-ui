import produce from "immer";
import {
  SET_AUTHENTICATION_FAIL,
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_SUCCESS,
  SET_FORGOT_PASSWORD_LOADING,
  SET_FORGOT_PASSWORD_SUCCESS,
  SET_LOGOUT_FAIL,
  SET_LOGOUT_LOADING,
  SET_LOGOUT_SUCCESS,
  RESET_FORGOT_PASSWORD,
} from "./consts";
import { initial } from "./initial";
import { IMainState } from "./types";

export default produce((draft: IMainState, action: any) => {
  switch (action.type) {
    case SET_AUTHENTICATION_LOADING: {
      draft.authentication.status = "LOADING";
      break;
    }
    case SET_AUTHENTICATION_SUCCESS: {
      draft.authentication.status = "SUCCESS";
      draft.authentication.data = action.payload;
      break;
    }
    case SET_AUTHENTICATION_FAIL: {
      draft.authentication.status = "FAIL";
      draft.authentication.error = action.error;
      break;
    }
    case SET_LOGOUT_FAIL: {
      draft.authentication.status = "IDLE";
      draft.authentication.data = undefined;
      draft.logout.status = "FAIL";
      draft.logout.error = action.error;
      break;
    }
    case SET_LOGOUT_SUCCESS: {
      draft.authentication.status = "IDLE";
      draft.authentication.data = undefined;
      draft.logout.status = "SUCCESS";
      break;
    }
    case SET_LOGOUT_LOADING: {
      draft.logout.status = "LOADING";
      break;
    }
    case SET_FORGOT_PASSWORD_LOADING: {
      draft.forgotpassword.status = "LOADING";
      break;
    }
    case SET_FORGOT_PASSWORD_SUCCESS: {
      draft.forgotpassword.status = "SUCCESS";
      break;
    }
    case RESET_FORGOT_PASSWORD: {
      draft.authentication.status = "IDLE";
      draft.authentication.data = undefined;
      draft.forgotpassword.status = "IDLE";
    }
  }
}, initial);
