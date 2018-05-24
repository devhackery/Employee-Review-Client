import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
 
import {reducer as authReducer} from './auth'


export default combineReducers({
  router: routerReducer,
  form:formReducer,
  authReducer
 
});
