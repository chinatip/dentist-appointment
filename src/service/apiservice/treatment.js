import { API_URL } from 'service/const';

export function fetchTreatments(){
    const URL = API_URL + "/api/treatments/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())

  }


export function getTreatments(specialty){
    const URL = API_URL + "/api/treatments/?specialty="+specialty+"/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())

}

export function createTreatment(newTreatment){
    const URL = API_URL + "/api/treatments/";
    return fetch(URL, {
            method: 'POST',
            body: JSON.stringify(newTreatment),
            headers: {
              "Content-Type": 'application/json',
              "Accept": "application/json"
            }
          }).then(function(response) {
            return response.json();
          })
  }

export function getTreatment(id){
    const URL = API_URL + "/api/treatments/" + id + "/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

  export function updateTreatment(id,newTreatment){
    const URL = API_URL + "/api/treatments/" + id + "/";
    return fetch(URL,  {
              method: 'PUT',
              body: {newTreatment}
          })
          .then(response => response.json())
  }