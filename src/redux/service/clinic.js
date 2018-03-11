// import { CLINICS } from './const';

const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE'; 

const initialState = {};


export function fetchClinicsWithRedux() {
    return (dispatch) => {
    dispatch(fetchClinicsRequest());
    return fetchClinics().then(([response, json]) =>{
        console.log(json);
        if(response.status === 200){
        dispatch(fetchClinicsSuccess(json))
      }
      else{

        dispatch(fetchClinicsError())
      }
    })
  }
}

function fetchClinics() {
    const URL = "http://35.198.239.97:8000/api/clinics/";
    return fetch(URL, { method: 'GET'})
       .then( response => Promise.all([response, response.json()]));
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "FETCH_REQUEST":
          return state;
        case "FETCH_SUCCESS": 
          return {...state, clinics: action.payload};
        default:
          return state
      }
}

function fetchClinicsRequest(){
    return {
      type: "FETCH_REQUEST"
    }
  }
  
function fetchClinicsSuccess(payload) {
    return {
      type: "FETCH_SUCCESS",
      payload
    }
}
  
function fetchClinicsError() {
    return {
      type: "FETCH_ERROR"
    }
}

export const getClinic = (id) => {
    const URL = "http://35.198.239.97:8000/api/clinics/"+id;
    return fetch(URL, { method: 'GET'})
       .then( response => Promise.all([response, response.json()]));
}

export const createClinic = (clinic) => {
    const URL = "http://35.198.239.97:8000/api/clinics/";
    return fetch(URL,  {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: clinic.name,
          address: clinic.address,
        })
      })
       .then((response) => response.json())
       .then((responseJson) => {
         return responseJson.success;
       })
       .catch((error) => {
         console.error(error);
       });
}

export const updateClinic = (id,clinic) => {
    const URL = "http://35.198.239.97:8000/api/clinics/"+id;
    return fetch(URL,  {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: clinic.name,
            address: clinic.address,
        })
      })
       .then((response) => response.json())
       .then((responseJson) => {
         return responseJson.success;
       })
       .catch((error) => {
         console.error(error);
       });
}


export const removeClinic = () => {
  return { type: REMOVE };
}