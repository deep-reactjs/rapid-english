import * as types from '../actionType';
import { Post } from '../../services/api.service';
import {SCORE} from '../../utils/HttpService';
import { Snackbar } from '../../component';
import { Strings } from '../../config/appConstants';
export const scoreActions = (data) => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        Post(SCORE,data).then((result) => {
          console.log(result);
          if (result.status) {
            dispatch(fetchScore(result));
          } else {
            Snackbar(result.message, Strings.close);
          }
          resolve(result);
        }, (error) => {
          Snackbar(error?error.toString():'Something went wrong', Strings.close);
          reject(error);
        });
      });
    } catch (error) {
      Snackbar(error?error.toString():'Something went wrong', Strings.close);
    }
  }
}

export const fetchScore = (data) => {
  return { type: types.LOAD_SCORE_DATA, data };
}