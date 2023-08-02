import {
  GET_NOTIFICATION,
  NOTIFICATION_DATA_SUCCESS,
  NOTIFICATION_FAIL,
  CLEAR_NOTIFICATION_DATA,
} from '../actionType';

const initialSettings = {
  notificationData: [],
  loading: true,
};

const notificationReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case GET_NOTIFICATION:
      return {
        ...state,
        loading: true,
      };
    case NOTIFICATION_DATA_SUCCESS:
      return {
        ...state,
        notificationData: action.data,
        loading: false,
      };
    case NOTIFICATION_FAIL:
      return {
        ...state,
        notificationData: action.data,
        loading: false,
      };
    case CLEAR_NOTIFICATION_DATA:
      return {
        ...state,
        notificationData: {},
        loading: false,
      };
    default:
      return state;
  }
};

export default notificationReducer;
