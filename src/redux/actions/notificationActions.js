import * as types from '../actionType';
import { Post } from '../../services/api.service';
import {NOTIFICATION} from '../../utils/HttpService';
import { Snackbar } from '../../component';
import { Strings } from '../../config/appConstants';
export const notificationActions = (data) => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        dispatch(fetchNotification());
        Post(NOTIFICATION,data).then((result) => {
          if (result.status) {
            dispatch(NotificationSuccess(result));
          } else {
            dispatch(NotificationFail(result));
            Snackbar(result.message, Strings.close);
          }
          resolve(result);
        }, (error) => {
          dispatch(NotificationFail());
          Snackbar(error?error.toString():'Something went wrong', Strings.close);
          reject(error);
        });
      });
    } catch (error) {
      dispatch(NotificationFail());
      Snackbar(error?error.toString():'Something went wrong', Strings.close);
    }
  }
}


export const fetchNotification = (data) => {
  return { type: types.GET_NOTIFICATION, data };
}
export const NotificationSuccess = (data) => {
  return { type: types.NOTIFICATION_DATA_SUCCESS, data };
}
export const NotificationFail = (data) => {
  return { type: types.NOTIFICATION_FAIL, data };
}
export const NotificationClear = (data) => {
  return { type: types.CLEAR_NOTIFICATION_DATA, data };
}