const head = '';
const CREATE = head + 'CREATE';
const UPDATE = head + 'UPDATE';
const REMOVE = head + 'REMOVE'; 

const initialState = {};

export function fetchUsersWithRedux() {
    return (dispatch) => {
    dispatch(fetchUsersRequest());
    return fetchUsers().then(([response, json]) =>{
        if(response.status === 200){
        dispatch(fetchUsersSuccess(json))
      }
      else{

        dispatch(fetchUsersError())
      }
    })
  }
}

// export function createUsersWithRedux(user) {
//     return (dispatch) => {
//     dispatch(fetchUsersRequest());
//     return createUsers(user).then(([response, json]) =>{
//         if(response.status === 200){
//         dispatch(fetchUsersSuccess(json))
//       }
//       else{

//         dispatch(fetchUsersError())
//       }
//     })
//   }
// }

// export function getUsersWithRedux(id) {
//     return (dispatch) => {
//     dispatch(fetchUsersRequest());
//     return getUsers(id).then(([response, json]) =>{
//         if(response.status === 200){
//         dispatch(fetchUsersSuccess(json))
//       }
//       else{

//         dispatch(fetchUsersError())
//       }
//     })
//   }
// }

// export function updateUsersWithRedux(id,user) {
//     return (dispatch) => {
//     dispatch(fetchUsersRequest());
//     return updateUsers(id,user).then(([response, json]) =>{
//         if(response.status === 200){
//         dispatch(fetchUsersSuccess(json))
//       }
//       else{
//         dispatch(fetchUsersError())
//       }
//     })
//   }
// }

function fetchUsers() {
  const URL = "http://35.198.239.97:8000/api/users/";
  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return state;
    case "FETCH_SUCCESS": 
      return {...state, users: action.payload};
    default:
      return state
  }
}


function fetchUsersRequest(){
    return {
      type: "FETCH_REQUEST"
    }
  }
  
function fetchUsersSuccess(payload) {
    return {
      type: "FETCH_SUCCESS",
      payload
    }
}
  
function fetchUsersError() {
    return {
      type: "FETCH_ERROR"
    }
}

export const getUser = (id) => {
    const URL = "http://35.198.239.97:8000/api/users/"+id;
    return fetch(URL, { method: 'GET'})
       .then( response => Promise.all([response, response.json()]));
}

export const createUser = (user) => {
    const URL = "http://35.198.239.97:8000/api/users/";
    return fetch(URL,  {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          lastname: user.lastname,
          gender: user.gender,
        })
      })
       .then((response) => response.json())
       .then((responseJson) => {
         return responseJson.success;
       })
       .catch((error) => {
         console.error(error);
       });
}

export const updateUser = (id,user) => {
    const URL = "http://35.198.239.97:8000/api/users/"+id;
    return fetch(URL,  {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          lastname: user.lastname,
          gender: user.gender,
        })
      })
       .then((response) => response.json())
       .then((responseJson) => {
         return responseJson.success;
       })
       .catch((error) => {
         console.error(error);
       });
}

export const removeUser = () => {
  return { type: REMOVE };
}