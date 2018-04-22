import { combineReducers } from 'redux'

import clinic from './clinic'
import user from './user'

export default combineReducers({
  clinic,
  user
})