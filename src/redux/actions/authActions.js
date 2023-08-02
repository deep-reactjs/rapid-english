import * as types from '../actionType';
import {Post} from '../../services/api.service';
import {LOGIN, REGISTER, SEND_OTP, FPASSWORD} from '../../utils/HttpService';
import {Snackbar} from '../../component';
import {Strings} from '../../config/appConstants';
export const signIn = data => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        dispatch(fetchSignIn());
        Post(LOGIN, data).then(
          result => {
            console.log('result',result);
            if (result.status) {
              dispatch(SignInSuccess(result));
            } else {
              dispatch(SignInFail(result));
              Snackbar(result.data.message, Strings.close);
            }
            resolve(result);
          },
          error => {
            dispatch(SignInFail());
            Snackbar(
              error ? error.toString() : 'Something went wrong',
              Strings.close,
            );
            reject(error);
          },
        );
      });
    } catch (error) {
      Snackbar(
        error ? error.toString() : 'Something went wrong',
        Strings.close,
      );
      dispatch(SignInFail());
    }
  };
};

export const signUp = data => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        dispatch(fetchSignUp());
        Post(SEND_OTP, data).then(
          result => {
            if (result.status) {
              dispatch(SignUpSuccess(result));
            } else {
              console.log(result);
              dispatch(SignUpFail(result));
              Snackbar(result.message, Strings.close);
            }
            resolve(result);
          },
          error => {
            Snackbar(
              error ? error.toString() : 'Something went wrong',
              Strings.close,
            );
            reject(error);
            dispatch(SignUpFail(result));
          },
        );
      });
    } catch (error) {
      Snackbar(
        error ? error.toString() : 'Something went wrong',
        Strings.close,
      );
      dispatch(SignUpFail(result));
    }
  };
};

export const sendOtp = data => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        dispatch(fetchOtp());
        Post(REGISTER, data).then(
          result => {
            if (result.status) {
              dispatch(OtpSuccess(result));
            } else {
              dispatch(OtpFail(result));
              Snackbar(result.message, Strings.close);
            }
            resolve(result);
          },
          error => {
            Snackbar(
              error ? error.toString() : 'Something went wrong',
              Strings.close,
            );
            dispatch(OtpFail());
            reject(error);
          },
        );
      });
    } catch (error) {
      Snackbar(
        error ? error.toString() : 'Something went wrong',
        Strings.close,
      );
      dispatch(OtpFail());
    }
  };
};

export const fPasswordActions = (data) => {
  return dispatch => {
    try {
      dispatch(fetchFPassword());
      return new Promise((resolve, reject) => {
        Post(FPASSWORD,data).then((result) => {
          if (result.status) {
            dispatch(FPasswordSuccess(result));
          } else {
            Snackbar(result.message, Strings.close);
            dispatch(FPasswordFail(result));
          }
          resolve(result);
        }, (error) => {
          dispatch(FPasswordFail());
          Snackbar(error?error.toString():'Something went wrong', Strings.close);
          reject(error);
        });
      });
    } catch (error) {
      dispatch(FPasswordFail());
      Snackbar(error?error.toString():'Something went wrong', Strings.close);
    }
  }
}

export const fetchSignIn = data => {
  return {type: types.LOGIN_DATA, data};
};
export const SignInSuccess = data => {
  return {type: types.LOGIN_DATA_SUCCESS, data};
};
export const SignInFail = data => {
  return {type: types.LOGIN_DATA_FAIL, data};
};
export const SignInClear = data => {
  return {type: types.LOGIN_DATA_CLEAR, data};
};


export const fetchSignUp = data => {
  return {type: types.REGISTER_DATA, data};
};
export const SignUpSuccess = data => {
  return {type: types.REGISTER_DATA_SUCCESS, data};
};
export const SignUpFail = data => {
  return {type: types.REGISTER_DATA_FAIL, data};
};
export const SignUpClear = data => {
  return {type: types.REGISTER_DATA_CLEAR, data};
};



export const fetchOtp = data => {
  return {type: types.SEND_OTP, data};
};
export const OtpSuccess = data => {
  return {type: types.SEND_OTP_SUCCESS, data};
};
export const OtpFail = data => {
  return {type: types.SEND_OTP_FAIL, data};
};
export const OtpClear = data => {
  return {type: types.SEND_OTP_CLEAR, data};
};


export const fetchFPassword = (data) => {
  return { type: types.GET_F_PASSWORD, data };
}
export const FPasswordSuccess = (data) => {
  return { type: types.F_PASSWORD_SUCCESS, data };
}
export const FPasswordFail = (data) => {
  return { type: types.F_PASSWORD_FAIL, data };
}
export const FPasswordClear = data => {
  return {type: types.CLEAR_F_PASSWORD, data};
};

export const onLogout = data => {
  return {type: types.LOGOUT_DATA, data};
};