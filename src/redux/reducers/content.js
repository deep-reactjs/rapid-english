import {
  LOAD_PRIVACY_DATA,
  LOAD_ABOUTUS_DATA,
  LOAD_CONTACTUS_DATA,
} from '../actionType';

const initialSettings = {
  privacyData: [],
  aboutData: [],
  contactData: [],
  loading: true,
};

const contentReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case LOAD_PRIVACY_DATA:
      return {
        ...state,
        privacyData: action.data,
        loading: false,
      };
    case LOAD_ABOUTUS_DATA:
      return {
        ...state,
        aboutData: action.data,
        loading: false,
      };
    case LOAD_CONTACTUS_DATA:
      return {
        ...state,
        contactData: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

export default contentReducer;
