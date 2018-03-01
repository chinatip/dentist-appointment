const head = '';
const CREATE = head + 'CREATE';
const UPDATE = head + 'UPDATE';
const REMOVE = head + 'REMOVE'; 

const initialState = {
  id: '001'
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, user: action.user  };
    default: 
      return state;
  }
}

export const getUser = (state) => {
  return state.user;
}

export const createUser = (user) => {
  return { type: CREATE, user };
}

export const updateUser = (user) => {
  return { type: UPDATE, user };
}

export const removeUser = () => {
  return { type: REMOVE };
}