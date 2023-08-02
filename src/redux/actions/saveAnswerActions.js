import * as types from '../actionType';
import { Post } from '../../services/api.service';
import {ANSWER} from '../../utils/HttpService';
import { Snackbar } from '../../component';
import { Strings } from '../../config/appConstants';
export const saveAnswerActions = (data) => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        dispatch(saveAnswer());
        Post(ANSWER,data).then((result) => {
          if (result.status) {
            dispatch(saveAnswerSuccess(result));
          } else {
            dispatch(saveAnswerFail(result));
            Snackbar(result.message, Strings.close);
          }
          resolve(result);
        }, (error) => {
          dispatch(saveAnswerFail());
          Snackbar(error?error.toString():'Something went wrong', Strings.close);
          reject(error);
        });
      });
    } catch (error) {
      dispatch(saveAnswerFail());
      Snackbar(error?error.toString():'Something went wrong', Strings.close);
    }
  }
}

export const saveAnswer = (data) => {
  return { type: types.GET_SAVE_ANSWER, data };
}
export const saveAnswerSuccess = (data) => {
  return { type: types.SAVE_ANSWER_SUCCESS, data };
}
export const saveAnswerFail = (data) => {
  return { type: types.SAVE_ANSWER_FAIL, data };
}
export const saveAnswerClear = (data) => {
  return { type: types.CLEAR_ANSWER_DATA, data };
}