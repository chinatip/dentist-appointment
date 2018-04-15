import { CLINICS } from './const';
import { API_URL } from 'const';


const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE'; 

const initialState = {
  clinics: CLINICS
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, clinic: action.clinics  };
    default: 
      return state;
  }
}

export const loadClinics = () => {
  return async dispatch => {
    try {
      dispatch({ type: 'UPDATE_LOADING', loading: true })
      const clinics = await load_clinics();
      dispatch({ type: UPDATE, clinics });
      dispatch({ type: 'UPDATE_LOADING', loading: false })
    } catch (e) {
      console.log('error')
    }
  }
}

export const createClinic = (clinic) => {
  return { type: CREATE, clinic };
}

export const updateClinic = (clinics) => {
  return { type: UPDATE, clinics };
}

export const removeClinic = () => {
  return { type: REMOVE };
}

const URL = API_URL + '/api/clinics/';

export const load_clinics = async () => {
  const response = await fetch(URL, { method: 'GET'})
  console.log('load_clinics',  response.json())

  return response.json();
}