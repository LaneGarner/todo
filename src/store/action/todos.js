import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_TODOS = 'GET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';

let todoData = [];

export const getTodos = () => {
  return async dispatch => {
    try {
      const savedTodos = await AsyncStorage.getItem('todos');
      const parsedTodos = JSON.parse(savedTodos);
      if (parsedTodos !== null) {
        todoData = parsedTodos;
      }
      dispatch({
        type: GET_TODOS,
        payload: todoData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addTodo = value => {
  return async dispatch => {
    const ids = todoData.map(items => items.id);
    const maxId = Math.max.apply(null, ids) + 1;
    console.log(maxId);
    const newItem = {
      id: maxId,
      value,
      status: false,
    };

    const newList = [...todoData, newItem];

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newList));

      dispatch(getTodos(), {
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
    const index = todoData.findIndex(todo => todo.id === id);
    todoData[index].value = value;

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todoData));
      dispatch(getTodos(), {
        type: EDIT_TODO,
        todoData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const completeTodo = id => {
  return async dispatch => {
    const index = todoData.findIndex(todo => todo.id === id);
    todoData[index].status = !todoData[index].status;

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todoData));
      dispatch(getTodos(), {
        type: COMPLETE_TODO,
        todoData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const removeTodo = id => {
  return async dispatch => {
    let deletedTodo = todoData.filter(todo => todo.id != id);
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(deletedTodo));
      dispatch(getTodos(), {
        type: DELETE_TODO,
        todoData,
      });
    } catch (err) {
      throw err;
    }
  };
};
