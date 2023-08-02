import { combineReducers } from 'redux'
import splash from './splash';
import auth from './auth';
import account from './account';
import blog from './blog';
import content from './content';
import quiz from './quiz';
import score from './score';
import saveAnswer from './saveAnswer';
import forgotPassword from './forgotPassword';
import notification from './notification';
export default rootReducer = combineReducers({
    auth,
    blog,
    quiz,
    splash,
    account,
    content,
    score,saveAnswer,forgotPassword,notification
});