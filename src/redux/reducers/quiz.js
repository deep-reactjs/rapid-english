import {
  GET_QUIZ_DATA,
  QUIZ_DATA_SUCCESS,
  QUIZ_DATA_FAIL,
  QUIZ_DATA_CLEAR,
} from '../actionType';

const initialSettings = {
  quizData: [],
  loading: true,
};

const quizReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case GET_QUIZ_DATA:
      return {
        ...state,
        loading: true,
      };
    case QUIZ_DATA_SUCCESS:
      return {
        ...state,
        quizData: action.data,
        loading: false,
      };
    case QUIZ_DATA_FAIL:
      return {
        ...state,
        quizData: action.data,
        loading: false,
      };
    case QUIZ_DATA_CLEAR:
      return {
        ...state,
        quizData: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default quizReducer;
