import { API_URL } from 'service/const';

export function fetchPatients(){
    const URL = API_URL+"/api/patients/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())

  }

export function createPatient(newPatient){
    const URL = API_URL+"/api/patients/";
    return fetch(URL, {
            method: 'POST',
            body: JSON.stringify(newPatient),
            headers: {
              "Content-Type": 'application/json',
              "Accept": "application/json"
            }
          }).then(function(response) {
            return response.json();
          })
  }

export function getPatient(id){
    const URL = API_URL+"/api/patients/"+id+"/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

export function updatePatient(id,newPatient){
    const URL = API_URL+"/api/patients/"+id+"/";
    return fetch(URL,  {
              method: 'PUT',
              body: {newPatient}
          })
          .then(response => response.json())
  }