import {
  GET_FORGOT_PASSWORD ,
  FORGOT_PASSWORD_SUCCESS ,
  FORGOT_PASSWORD_FAIL,
  CLEAR_FORGOT_PASSWORD,
} from '../actionType';

const initialSettings = {
  forgotPasswordData: [],
  loading: false,
  error: {},
};

const forgotPassword = (state = initialSettings, action) => {
  switch (action.type) {
    case GET_FORGOT_PASSWORD :
      return {
        ...state,
        loading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordData: action.data,
        loading: false,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        forgotPasswordData: action.data,
        loading: false,
      };
    case CLEAR_FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordData:[],
        loading: false,
      };
    default:
      return state;
  }
};

export default forgotPassword;
