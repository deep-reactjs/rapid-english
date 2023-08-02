import * as types from '../actionType';
import { Post } from '../../services/api.service';
import { FORGOTPASSWORD } from '../../utils/HttpService';
import { Snackbar } from '../../component';
import { Strings } from '../../config/appConstants';
export const forgotPasswordActions = (data) => {
  return dispatch => {
    try {
      dispatch(fetchForgotPassword());
      return new Promise((resolve, reject) => {
        Post(FORGOTPASSWORD,data).then((result) => {
          if (result.status) {
            dispatch(forgotPasswordSuccess(result));
          } else {
            Snackbar(result.message, Strings.close);
            dispatch(forgotPasswordFail(result));
          }
          resolve(result);
        }, (error) => {
          dispatch(forgotPasswordFail());
          Snackbar(error?error.toString():'Something went wrong', Strings.close);
          reject(error);
        });
      });
    } catch (error) {
      dispatch(forgotPasswordFail());
      Snackbar(error?error.toString():'Something went wrong', Strings.close);
    }
  }
}

export const fetchForgotPassword = (data) => {
  return { type: types.GET_FORGOT_PASSWORD, data };
}
export const forgotPasswordSuccess = (data) => {
  return { type: types.FORGOT_PASSWORD_SUCCESS, data };
}
export const forgotPasswordFail = (data) => {
  return { type: types.FORGOT_PASSWORD_FAIL, data };
}
export const forgotPasswordClear = data => {
  return {type: types.CLEAR_FORGOT_PASSWORD, data};
};
