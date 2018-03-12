  //Service for Patient
const apiURL = `http://35.198.239.97:8000`
export function fetchPatients(){
    const URL = apiURL+"/api/patients/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())

  }

export function createPatient(newPatient){
    const URL = apiURL+"/api/patients/";
    return fetch(URL, {
            method: 'post',
            body: newPatient
          }).then(function(response) {
            return response.json();
          })
  }

export function getPatient(id){
    const URL = apiURL+"/api/patients/"+id;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

export function updatePatient(id,newPatient){
    const URL = apiURL+"/api/patients/"+id;
    return fetch(URL,  {
              method: 'PUT',
              body: {newPatient}
          })
          .then(response => response.json())
  }