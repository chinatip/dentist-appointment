import { combineReducers } from 'redux';

import user from './user';
import clinic from './clinic';
import appointment from './appointment';

export default combineReducers({
  user,
  clinic,
  appointment,
});