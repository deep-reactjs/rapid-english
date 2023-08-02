import * as types from '../actionType';
import {Post} from '../../services/api.service';
import {PROFILE, UPDATEPROFILE} from '../../utils/HttpService';
import {Snackbar} from '../../component';
import {Strings} from '../../config/appConstants';

export const accountActions = data => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        dispatch(fetchAccount());
        Post(PROFILE,data).then(
          result => {
            if (result.status) {
              dispatch(fetchAccountSuccess(result));
            } else {
              Snackbar(result.data.message, Strings.close);
              dispatch(fetchAccountFail(result));
            }
            resolve(result);
          },
          error => {
            Snackbar(
              error ? error.toString() : 'Something went wrong',
              Strings.close,
            );
            dispatch(fetchAccountFail());
            reject(error);
          },
        );
      });
    } catch (error) {
      Snackbar(
        error ? error.toString() : 'Something went wrong',
        Strings.close,
      );
      dispatch(fetchAccountFail());
    }
  };
};

export const accountUpdateActions = data => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        dispatch(fetchAccountUpdate());
        Post(UPDATEPROFILE,data).then(
          result => {
            if (result.status) {
              dispatch(AccountUpdateSuccess(result));
            } else {
              Snackbar(result.data.message, Strings.close);
              dispatch(AccountUpdateFail(result));
            }
            resolve(result);
          },
          error => {
            Snackbar(
              error ? error.toString() : 'Something went wrong',
              Strings.close,
            );
            dispatch(AccountUpdateFail());
            reject(error);
          },
        );
      });
    } catch (error) {
      Snackbar(
        error ? error.toString() : 'Something went wrong',
        Strings.close,
      );
      dispatch(AccountUpdateFail());
    }
  };
};


export const fetchAccount = data => {
  return {type: types.GET_PROFILE_DATA, data};
};

export const fetchAccountSuccess = data => {
  return {type: types.PROFILE_DATA_SUCCESS, data};
};

export const fetchAccountFail = data => {
  return {type: types.PROFILE_DATA_FAIL, data};
};

export const accountDataClear = data => {
  return {type: types.CLEAR_PROFILE_DATA, data};
};



export const fetchAccountUpdate = data => {
  return {type: types.UPDATE_PROFILE_DATA, data};
};

export const AccountUpdateSuccess = data => {
  return {type: types.UPDATE_PROFILE_SUCCESS, data};
};

export const AccountUpdateFail = data => {
  return {type: types.UPDATE_PROFILE_FAIL, data};
};

export const AccountUpdateClear = data => {
  return {type: types.CLEAR_UPDATE_PROFILE_DATA, data};
};