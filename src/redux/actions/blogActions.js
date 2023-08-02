import * as types from '../actionType';
import { Post } from '../../services/api.service';
import {BLOG} from '../../utils/HttpService';
import { Snackbar } from '../../component';
import { Strings } from '../../config/appConstants';
export const blogActions = (data) => {
  return dispatch => {
    try {
      dispatch(fetchBlog());
      return new Promise((resolve, reject) => {
        Post(BLOG,data).then((result) => {
          if (result.status) {
            dispatch(fetchBlogSuccess(result));
          } else {
            Snackbar(result.message, Strings.close);
            dispatch(fetchBlogFail(result));
          }
          resolve(result);
        }, (error) => {
          dispatch(fetchBlogFail());
          Snackbar(error?error.toString():'Something went wrong', Strings.close);
          reject(error);
        });
      });
    } catch (error) {
      dispatch(fetchBlogFail());
      Snackbar(error?error.toString():'Something went wrong', Strings.close);
    }
  }
}

export const fetchBlog = (data) => {
  return { type: types.GET_BLOG_DATA, data };
}
export const fetchBlogSuccess = (data) => {
  return { type: types.BLOG_DATA_SUCCESS, data };
}
export const fetchBlogFail = (data) => {
  return { type: types.BLOG_DATA_FAIL, data };
}
export const onBlogClear = data => {
  return {type: types.BLOG_DATA_CLEAR, data};
};
