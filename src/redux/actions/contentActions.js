import * as types from '../actionType';
import {Post} from '../../services/api.service';
import {CONTENT} from '../../utils/HttpService';
import {Snackbar} from '../../component';
import {Strings} from '../../config/appConstants';
export const privacy = data => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        Post(CONTENT,data).then(
          result => {
            if (result.status) {
              dispatch(fetchPrivacy(result));
            } else {
              Snackbar(result.message, Strings.close);
            }
            resolve(result);
          },
          error => {
            Snackbar(
              error ? error.toString() : 'Something went wrong',
              Strings.close,
            );
            reject(error);
          },
        );
      });
    } catch (error) {
      Snackbar(
        error ? error.toString() : 'Something went wrong',
        Strings.close,
      );
    }
  };
};

export const aboutUs = data => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        Post(CONTENT,data).then(
          result => {
            if (result.status) {
              dispatch(fetchAboutUs(result));
            } else {
              Snackbar(result.data.message, Strings.close);
            }
            resolve(result);
          },
          error => {
            Snackbar(
              error ? error.toString() : 'Something went wrong',
              Strings.close,
            );
            reject(error);
          },
        );
      });
    } catch (error) {
      Snackbar(
        error ? error.toString() : 'Something went wrong',
        Strings.close,
      );
    }
  };
};

export const contactUs = data => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        Post(CONTENT,data).then(
          result => {
            if (result.status) {
              dispatch(fetchContactUs(result));
            } else {
              Snackbar(result.data.message, Strings.close);
            }
            resolve(result);
          },
          error => {
            Snackbar(
              error ? error.toString() : 'Something went wrong',
              Strings.close,
            );
            reject(error);
          },
        );
      });
    } catch (error) {
      Snackbar(
        error ? error.toString() : 'Something went wrong',
        Strings.close,
      );
    }
  };
};

export const fetchPrivacy = data => {
  return {type: types.LOAD_PRIVACY_DATA, data};
};

export const fetchAboutUs = data => {
  return {type: types.LOAD_ABOUTUS_DATA, data};
};

export const fetchContactUs = data => {
  return {type: types.LOAD_CONTACTUS_DATA, data};
};
