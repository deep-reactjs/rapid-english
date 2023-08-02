import {
  GET_BLOG_DATA,
  BLOG_DATA_SUCCESS,
  BLOG_DATA_FAIL,
  BLOG_DATA_CLEAR,
} from '../actionType';

const initialSettings = {
  blogData: [],
  loading: true,
  lazy: false,
  page: 0,
  pageData: [],
  file_url: '',
};

const blogReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case GET_BLOG_DATA:
      return {
        ...state,
        loading: true,
        lazy:state.page != 0 ? true : false
      };
    case BLOG_DATA_SUCCESS:
      state.pageData.push(state.page);
      return {
        ...state,
        page: action.data.data.length < 1 ? 0 : state.page + 8,
        blogData: action.data.data && state.blogData.concat(action.data.data),
        loading: false,
        lazy: false,
        file_url: action.data.file_url,
      };
    case BLOG_DATA_FAIL:
      return {
        ...state,
        loading: false,
        lazy: false,
      };
    case BLOG_DATA_CLEAR:
      return {
        ...state,
        page: 0,
        blogData: [],
        pageData: [],
        loading: true,
        lazy: false,
        file_url: '',
      };
    default:
      return state;
  }
};

export default blogReducer;
