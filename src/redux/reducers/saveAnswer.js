import { 
  GET_SAVE_ANSWER,
  SAVE_ANSWER_SUCCESS,
  SAVE_ANSWER_FAIL,
  CLEAR_ANSWER_DATA
   } from '../actionType';

const initialSettings = {
  saveAnswer: [],
  loading: false,
};

const quizReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case GET_SAVE_ANSWER:
      return {
        ...state,
        loading: true,
      };
      case SAVE_ANSWER_SUCCESS:
      return {
        ...state,
        saveAnswer: action.data,
        loading: false,
      };
      case SAVE_ANSWER_FAIL:
      return {
        ...state,
        saveAnswer: action.data,
        loading: false,
      };
      case CLEAR_ANSWER_DATA:
      return {
        ...state,
        saveAnswer:[],
        loading: false,
      };
    default:
      return state;
  }
};

export default quizReducer;