import { API_URL } from 'service/const';

const URL = API_URL + '/api/clinics/';

  export function fetchClinics(){
    return fetch(URL, { method: 'GET'})
      .then((response) => response.json())
  }

  export function createClinic(newClinic){
    return fetch(URL, {
      method: 'POST',
      body: JSON.stringify(newClinic),
      headers: {
        "Content-Type": 'application/json',
        "Accept": "application/json"
      }
    }).then(function(response) {
      return response.json();
    })
  }

export function getClinic(id){
  return fetch(URL + id + '/', { method: 'GET'})
    .then((response) => response.json())
}

export function updateClinic(id, newClinic){
  return fetch(URL + id + '/', {
    method: 'PUT',
    body: JSON.stringify(newClinic),
    headers: {
      "Content-Type": 'application/json',
      "Accept": "application/json"
    }
  }).then(function(response) {
    return response.json();
  })
}
