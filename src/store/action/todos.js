import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../index.js';

export const GET_TODOS = 'GET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const getTodos = () => {
  return async dispatch => {
    try {
      const savedTodos = await AsyncStorage.getItem('todos');
      const parsedTodos = JSON.parse(savedTodos);

      dispatch({
        type: GET_TODOS,
        payload: parsedTodos,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addTodo = value => {
  return async dispatch => {
    const currentTodos = store.getState().todos;
    const ids = currentTodos.map(items => items.id);
    let maxId = Math.max.apply(null, ids) + 1;
    {
      maxId < 0 && (maxId = 1);
    }
    console.log(maxId);

    const newItem = {
      id: maxId,
      value,
      status: false,
    };

    const newList = [...currentTodos, newItem];

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newList));
      dispatch({
        type: ADD_TODO,
        payload: newList,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const editTodo = (id, value) => {
  return async dispatch => {
    const currentTodos = store.getState().todos;
    const index = currentTodos.findIndex(todo => todo.id === id);
    currentTodos[index].value = value;

    const newList = [...currentTodos];

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newList));
      dispatch({
        type: EDIT_TODO,
        payload: newList,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const completeTodo = id => {
  return async dispatch => {
    const currentTodos = store.getState().todos;
    const index = currentTodos.findIndex(todo => todo.id === id);
    currentTodos[index].status = !currentTodos[index].status;

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(currentTodos));

      dispatch({
        type: COMPLETE_TODO,
        payload: currentTodos,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const removeTodo = id => {
  const currentTodos = store.getState().todos;
  return async dispatch => {
    let deletedTodo = currentTodos.filter(todo => todo.id != id);

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(deletedTodo));
      dispatch(getTodos(), {
        type: DELETE_TODO,
        payload: currentTodos,
      });
    } catch (err) {
      throw err;
    }
  };
};
