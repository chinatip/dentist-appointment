const head = '';
const CREATE = head + 'CREATE';
const UPDATE = head + 'UPDATE';
const REMOVE = head + 'REMOVE'; 

export default (state = {}, action = {}) => {
  switch (action.type) {
    case CREATE:
      const { id, appointment } = action;

      return { 
        ...state, 
        [id]: appointment 
      };
    default: 
      return state;
  }
}

export const getAppointmentById = (state, id) => {
  return state.appointment[id];
}

export const createAppointment = (id, appointment) => {
  return { type: CREATE, id, appointment };
}

export const updateAppointment = (appointment) => {
  return { type: UPDATE, appointment };
}

export const removeAppointment = () => {
  return { type: REMOVE };
}