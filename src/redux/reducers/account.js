import {
  GET_PROFILE_DATA,
  PROFILE_DATA_SUCCESS,
  PROFILE_DATA_FAIL,
  CLEAR_PROFILE_DATA,
  UPDATE_PROFILE_DATA,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  CLEAR_UPDATE_PROFILE_DATA,
} from '../actionType';

const initialSettings = {
  profileData: [],
  editProfile: [],
  loading: false,
  error: {},
};

const splashReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case GET_PROFILE_DATA:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_DATA_SUCCESS:
      return {
        ...state,
        profileData: action.data,
        loading: false,
      };
    case PROFILE_DATA_FAIL:
      return {
        ...state,
        profileData: action.data,
        loading: false,
      };
    case CLEAR_PROFILE_DATA:
      return {
        ...state,
        profileData:[],
        loading: false,
      };
      

    case UPDATE_PROFILE_DATA:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        editProfile: action.data,
        loading: false,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        editProfile: action.data,
        loading: false,
      };
    case CLEAR_UPDATE_PROFILE_DATA:
      return {
        ...state,
        editProfile: [],
        loading: true,
      };
    default:
      return state;
  }
};

export default splashReducer;
