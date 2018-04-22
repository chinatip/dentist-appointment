const head = ''
const SET = head + 'SET'
const REMOVE = head + 'REMOVE' 

export default (state = null, action = {}) => {
  switch (action.type) {
    case SET:
      return action.clinic
    case REMOVE:
      return null
    default: 
      return state
  }
}

export const getClinic = (state) => {
  return state.clinic
}

export const setClinic = (clinic) => {
  return { type: SET, clinic }
}

export const removeClinic = () => {
  return { type: REMOVE }
}