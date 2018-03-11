import { combineReducers } from 'redux';

import users from './user';
import clinics from './clinic';
import appointments from './appointment';

export default combineReducers({
  users,
  clinics,
  appointments,
});