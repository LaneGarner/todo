import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useDispatch} from 'react-redux';
import {getState} from 'redux';

import {addTodo} from '../store/action/todos';
import {Button} from '../components/Button';
import {theme} from '../utils/theme';
import store from '../store';

export const NewTodo = props => {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = e => setInputValue(e);

  const dispatch = useDispatch();

  const addItem = () => dispatch(addTodo(inputValue));

  const gotoTodos = () => Navigation.pop(props.componentId);
  // console.log(store.getState());

  // const currentState = store.getState();
  const handleAddItem = () => {
    addItem(inputValue);
    gotoTodos();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleChangeInput}
        value={inputValue}
        placeholder="Enter new todo"
        autoFocus
      />
      <Button onPress={handleAddItem} text="Add" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    margin: theme.sizes.lg,
    fontSize: theme.sizes.md,
  },
});
