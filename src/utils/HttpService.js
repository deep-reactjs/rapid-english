import { Constants } from "../config/appConstants";
const BaseUrl = __DEV__ ? Constants.API_BASE_URL : Constants.API_BASE_URL;
export const APP = BaseUrl + 'app-version';
export const LOGIN = BaseUrl + 'login';
export const REGISTER = BaseUrl + 'register';
export const SEND_OTP = BaseUrl + 'otp';
export const FPASSWORD = BaseUrl + 'forgot';
export const CONTENT = BaseUrl + 'content';
export const BLOG = BaseUrl + 'blog-list';
export const FORGOTPASSWORD = BaseUrl + 'reset';
export const QUIZ = BaseUrl + 'quiz';
export const PROFILE = BaseUrl + 'profile';
export const UPDATEPROFILE = BaseUrl + 'update-profile';
export const DELETE = BaseUrl + 'delete';
export const NOTIFICATION = BaseUrl + 'notification';
export const ANSWER = BaseUrl + 'answer';
export const SCORE = BaseUrl + 'score';



export const  Facebook = "https://graph.facebook.com/v2.5/me?fields=email,name, picture, friends&access_token=";
export const  Google = 'https://translation.googleapis.com/language/translate/v2';
export const  DictionaryApi = "https://api.dictionaryapi.dev/api/v2/entries/";