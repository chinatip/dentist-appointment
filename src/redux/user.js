const head = '';
const LOAD = head + 'LOAD';
const CREATE = head + 'CREATE';
const UPDATE = head + 'UPDATE';
const REMOVE = head + 'REMOVE'; 

const initialState = {
  name: 'default'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return state.user;
    case UPDATE:
      return { ...state, user: action.user  };
    default: 
      return state;
  }
}

export function loadUser(state) {
  return state.user
}

export function createUser(user) {
  return { type: CREATE, user };
}

export function updateUser(user) {
  return { type: UPDATE, user };
}

export function removeUser() {
  return { type: REMOVE };
}

export function getUser(state) {
  return (dispatch) => dispatch(loadUser(state));
}