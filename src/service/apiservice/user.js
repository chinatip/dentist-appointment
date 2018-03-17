import { API_URL } from 'service/const';

const URL = API_URL + '/api/users/';

export function fetchUsers(){
  return fetch(URL, { method: 'GET'})
    .then((response) => response.json())
}

export function createUser(newUser){
  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": 'application/json',
      "Accept": "application/json"
    }
  }).then(function(response) {
    return response.json();
  })
}

export function getUser(id){
  return fetch(URL + id + '/', { method: 'GET'})
      .then((response) => response.json())
}

export function updateUser(id, newUser){
  return fetch(URL + id + '/',  {
      method: 'PUT',
      body: {newUser}
  })
  .then(response => response.json())
}