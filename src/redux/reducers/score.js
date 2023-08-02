import { LOAD_SCORE_DATA } from '../actionType';

const initialSettings = {
  scoreData: [],
  loading: true,
};

const scoreReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case LOAD_SCORE_DATA:
      return {
        ...state,
        scoreData: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

export default scoreReducer;