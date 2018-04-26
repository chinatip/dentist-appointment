const head = 'user/'
const SET = head + 'SET'
const REMOVE = head + 'REMOVE' 

export default (state = null, action = {}) => {
  switch (action.type) {
    case SET:
      return action.user
    case REMOVE:
      return null
    default: 
      return state
  }
}

export const getUser = (state) => {
  return state.user
}

export const setUser = (user) => {
  return { type: SET, user }
}

export const removeUser = () => {
  return { type: REMOVE }
}