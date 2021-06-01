import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import {Todo} from '../screens/Todo';
import {NewTodo} from '../screens/NewTodo';
import {EditTodo} from '../screens/EditTodo';
import store from '../store';

export const registerScreens = () => {
  registerWithRedux('Todo', Todo);
  registerWithRedux('NewTodo', NewTodo);
  registerWithRedux('EditTodo', EditTodo);
};

const registerWithRedux = (componentName, Screen) => {
  Navigation.registerComponent(
    componentName,
    () => props =>
      (
        <Provider store={store}>
          <Screen {...props} />
        </Provider>
      ),
    () => Screen,
  );
};
