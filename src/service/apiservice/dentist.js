import { API_URL } from 'service/const';

const URL = API_URL + "/api/dentists/";

export function fetchDentists(clinic, treatment){
  const FETCH_URL = `${URL}?clinic=${clinic}&treatment=${treatment}`

  return fetch(FETCH_URL, { method: 'GET'})
    .then((response) => response.json())

}

export function createDentist(newDentist){
  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify(newDentist),
    headers: {
      "Content-Type": 'application/json',
      "Accept": "application/json"
    }
  }).then(function(response) {
    return response.json();
  })
}

export function getDentist(id){
  return fetch(URL + id + '/', { method: 'GET'})
    .then((response) => response.json())
}

export function updateDentist(id,newDentist){
  return fetch(URL + id + '/',  {
      method: 'PUT',
      body: {newDentist}
  })
  .then(response => response.json())
}
