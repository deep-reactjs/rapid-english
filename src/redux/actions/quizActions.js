import * as types from '../actionType';
import { Post } from '../../services/api.service';
import {QUIZ} from '../../utils/HttpService';
import { Snackbar } from '../../component';
import { Strings } from '../../config/appConstants';
export const quizActions = (data) => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        dispatch(fetchQuiz());
        Post(QUIZ,data).then((result) => {
          console.log('resultresult',result);
          if (result.status) {
            dispatch(QuizSuccess(result));
          } else {
            dispatch(QuizFaill(result));
            Snackbar(result.message, Strings.close);
          }
          resolve(result);
        }, (error) => {
          dispatch(QuizFaill());
          Snackbar(error?error.toString():'Something went wrong', Strings.close);
          reject(error);
        });
      });
    } catch (error) {
      dispatch(QuizFaill());
      Snackbar(error?error.toString():'Something went wrong', Strings.close);
    }
  }
}

export const fetchQuiz = (data) => {
  return { type: types.GET_QUIZ_DATA, data };
}
export const QuizSuccess = (data) => {
  return { type: types.QUIZ_DATA_SUCCESS, data };
}
export const QuizFaill = (data) => {
  return { type: types.QUIZ_DATA_FAIL, data };
}
export const onQuizClear = data => {
  return {type: types.QUIZ_DATA_CLEAR, data};
};