//Service for User
const apiURL = `http://35.198.239.97:8000`
export function fetchUsers(){
    const URL = apiURL+"/api/users/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())

  }

export function createUser(newUser){
    const URL = apiURL+"/api/users/";
    return fetch(URL, {
            method: 'post',
            body: newUser
          }).then(function(response) {
            return response.json();
          })
  }

export function getUser(id){
    const URL = apiURL+"/api/users/"+id;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

  export function updateUser(id,newUser){
    const URL = apiURL+"/api/users/"+id;
    return fetch(URL,  {
              method: 'PUT',
              body: {newUser}
          })
          .then(response => response.json())
  }