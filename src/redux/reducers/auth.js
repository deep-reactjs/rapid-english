import {
  LOGIN_DATA,
  LOGIN_DATA_SUCCESS,
  LOGIN_DATA_FAIL,
  LOGIN_DATA_CLEAR,
  REGISTER_DATA,
  REGISTER_DATA_SUCCESS,
  REGISTER_DATA_FAIL,
  REGISTER_DATA_CLEAR,
  SEND_OTP,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAIL,
  SEND_OTP_CLEAR,
  LOGOUT_DATA,
  GET_F_PASSWORD ,
  F_PASSWORD_SUCCESS ,
  F_PASSWORD_FAIL,
  CLEAR_F_PASSWORD,
} from '../actionType';

const initialSettings = {
  signInData: {},
  signUpData: {},
  otpData: {},
  fPasswordData:{},
  loading: false,
};

const authReducer = (state = initialSettings, action) => {
  switch (action.type) {

    case GET_F_PASSWORD :
      return {
        ...state,
        loading: true,
      };
    case F_PASSWORD_SUCCESS:
      return {
        ...state,
        fPasswordData: action.data,
        loading: false,
      };
    case F_PASSWORD_FAIL:
      return {
        ...state,
        fPasswordData: action.data,
        loading: false,
      };
    case CLEAR_F_PASSWORD:
      return {
        ...state,
        fPasswordData:[],
        loading: false,
      };

    case LOGIN_DATA:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_DATA_SUCCESS:
      return {
        ...state,
        signInData: action.data,
        loading: false,
      };
    case LOGIN_DATA_FAIL:
      return {
        ...state,
        signInData: action.data,
        loading: false,
      };
    case LOGIN_DATA_CLEAR:
      return {
        ...state,
        signInData: {},
        loading: false,
      };



    case REGISTER_DATA:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_DATA_SUCCESS:
      return {
        ...state,
        signUpData: action.data,
        loading: false,
      };
    case REGISTER_DATA_FAIL:
      return {
        ...state,
        signUpData: action.data,
        loading: false,
      };
    case REGISTER_DATA_CLEAR:
      return {
        ...state,
        signUpData: {},
        loading: false,
      };




    case SEND_OTP:
      return {
        ...state,
        loading: true,
    };
    case SEND_OTP_SUCCESS:
      return {
        ...state,
        otpData: action.data,
        loading: false,
    };
    case SEND_OTP_FAIL:
      return {
        ...state,
        otpData: action.data,
        loading: false,
    };
    case SEND_OTP_CLEAR:
      return {
        ...state,
        otpData: {},
        loading: false,
    };




    case LOGOUT_DATA:
      return {
        ...state,
        signInData: {},
        signUpData: {},
        otpData: {},
        fPasswordData:{},
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
