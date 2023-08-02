import * as types from '../actionType';
import {Post} from '../../services/api.service';
import {APP} from '../../utils/HttpService';
import {Snackbar} from '../../component';
import {Strings} from '../../config/appConstants';
export const appVersion = data => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        console.log('APP -------------------',APP);
        Post(APP).then(
          result => {
            if (result.status) {
              dispatch(fetchAppVersion(result));
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

export const fetchAppVersion = data => {
  return {type: types.LOAD_APP_VERSION, data};
};
