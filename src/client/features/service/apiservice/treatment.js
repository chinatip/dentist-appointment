//Service for Treatment
const apiURL = `http://35.198.239.97:8000`
export function fetchTreatments(){
    const URL = apiURL+"/api/treatments/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())

  }

export function createTreatment(newTreatment){
    const URL = apiURL+"/api/treatments/";
    return fetch(URL, {
            method: 'post',
            body: newTreatment
          }).then(function(response) {
            return response.json();
          })
  }

export function getTreatment(id){
    const URL = apiURL+"/api/treatments/"+id;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

  export function updateTreatment(id,newTreatment){
    const URL = apiURL+"/api/treatments/"+id;
    return fetch(URL,  {
              method: 'PUT',
              body: {newTreatment}
          })
          .then(response => response.json())
  }