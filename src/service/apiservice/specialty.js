import { API_URL } from 'service/const';

export function fetchSpecialties(){
    const URL = API_URL + "/api/specialties/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())

  }

export function createSpecialty(newSpecialty){
    const URL = API_URL + "/api/specialties/";
    return fetch(URL, {
            method: 'POST',
            body: JSON.stringify(newSpecialty),
            headers: {
              "Content-Type": 'application/json',
              "Accept": "application/json"
            }
          }).then(function(response) {
            return response.json();
          })
  }

export function getSpecialty(id){
    const URL = API_URL + "/api/specialties/" + id + "/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

  export function updateSpecialty(id,newSpecialty){
    const URL = API_URL + "/api/specialties/" + id + "/";
    return fetch(URL,  {
              method: 'PUT',
              body: {newSpecialty}
          })
          .then(response => response.json())
  }