  //Service for Clinic
const apiURL = `http://35.198.239.97:8000`
  export function fetchClinics(){
    const URL = apiURL+"/api/clinics/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

  export function createClinic(newClinic){
    const URL = apiURL+"/api/clinics/";
    return fetch(URL, {
            method: 'post',
            body: newClinic
          }).then(function(response) {
            return response.json();
          })
  }

  export function getClinic(id){
    const URL = apiURL+"/api/clinics/"+id;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

  export function updateClinic(id,newClinic){
    const URL = apiURL+"/api/clinics/"+id;
    return fetch(URL,  {
              method: 'PUT',
              body: {newClinic}
          })
          .then(response => response.json())
  }
