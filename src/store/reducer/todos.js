import {
  GET_TODOS,
  ADD_TODO,
  COMPLETE_TODO,
  EDIT_TODO,
  DELETE_TODO,
} from '../action/todos';

const initialState = {
  todos: [],
};

export const todos = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {...state, todos: action.payload};
    case ADD_TODO:
      return {...state, todos: action.payload};
    case COMPLETE_TODO:
      return {...state, todos: action.payload};
    case EDIT_TODO:
      return {...state, todos: action.payload};
    case DELETE_TODO:
      return {...state, todos: action.payload};
    default:
      return state;
  }
};
