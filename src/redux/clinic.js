import { CLINICS } from './const';
import { API_URL } from 'service/const';


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

export const loadClinics = (state) => {
  return async dispatch => {
    try {
      const data = await load_clinics();
      console.log('try', data)
      dispatch(data)
    } catch (e) {
      console.log('error')
    }
  }
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

const URL = API_URL + '/api/clinics/';

export function getClinics(){
  return fetch(URL, { method: 'GET'})
    .then((response) => response.json())
}

export const load_clinics = async () => {
  const response = await fetch(URL, { method: 'GET'})
  console.log('load_clinics',  response.json())

  return response.json();
}