import { LOAD_APP_VERSION } from '../actionType';

const initialSettings = {
  data: [],
  loading:true
};

const splashReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case LOAD_APP_VERSION:
      return {
        ...state,
        data: action.data,
        loading:false
      };
    default:
      return state;
  }
};

export default splashReducer;