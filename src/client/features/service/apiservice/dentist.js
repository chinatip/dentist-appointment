  //Service for Dentist
  const apiURL = `http://35.198.239.97:8000`
export function fetchDentists(clinic){
    const URL = apiURL+"/api/dentists/?clinic="+clinic;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())

  }

  export function createDentist(newDentist){
    const URL = apiURL+"/api/dentists/";
    return fetch(URL, {
            method: 'post',
            body: newDentist
          }).then(function(response) {
            return response.json();
          })
  }

export function getDentist(id){
    const URL = apiURL+"/api/dentists/"+id;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

export function updateDentist(id,newDentist){
    const URL = apiURL+"/api/dentists/"+id;
    return fetch(URL,  {
              method: 'PUT',
              body: {newDentist}
          })
          .then(response => response.json())
  }
