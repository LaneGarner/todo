import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useDispatch} from 'react-redux';

import {editTodo} from '../store/action/todos';
import {Button} from '../components/Button';
import {theme} from '../utils/theme';

export const EditTodo = props => {
  const [inputValue, setInputValue] = useState(props.item.value);

  const handleChangeInput = e => setInputValue(e);

  const dispatch = useDispatch();

  const updateTodo = () => dispatch(editTodo(props.item.id, inputValue));

  const gotoTodos = () => Navigation.pop(props.componentId);

  const handleEditItem = () => {
    updateTodo(props.item.id, inputValue);
    gotoTodos();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleChangeInput}
        value={inputValue}
        placeholder="Edit todo"
        autoFocus
      />
      <Button onPress={handleEditItem} text="Edit" />
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
