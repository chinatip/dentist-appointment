import { CLINICS } from './const';

const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE'; 

const initialState = {
  clinics: CLINICS
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, clinic: action.clinic  };
    default: 
      return state;
  }
}

export const getClinics = (state) => {
  return state.clinic.clinics;
}

export const createClinic = (clinic) => {
  return { type: CREATE, clinic };
}

export const updateClinic = (clinic) => {
  return { type: UPDATE, clinic };
}

export const removeClinic = () => {
  return { type: REMOVE };
}