import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';

import {removeTodo, completeTodo} from '../store/action/todos';
import {theme} from '../utils/theme';

export const Item = props => {
  const [showSettings, setShowSettings] = useState(false);

  const dispatch = useDispatch();
  const removeItem = todo => dispatch(removeTodo(todo));
  const completeItem = todo => dispatch(completeTodo(todo));

  const handleRemove = () => removeItem(props.item.id);

  const handleEdit = () => {
    props.gotoEditTodo(props.item);
    setShowSettings(false);
  };

  const handleComplete = () => {
    completeItem(props.item.id);
    setShowSettings(false);
  };

  return (
    <View style={styles.todoItem}>
      <View
        style={showSettings ? styles.todoItemShrink : styles.todoItemExpand}>
        <Text style={props.item.status ? styles.completedText : styles.text}>
          {props.item.value}
        </Text>
        <Icon
          style={styles.showMoreIcon}
          name="more-horizontal"
          onPress={() => setShowSettings(!showSettings)}
          size={25}
        />
      </View>
      {showSettings && (
        <View style={styles.icons}>
          <Icon
            style={styles.completeIcon}
            name="check"
            onPress={handleComplete}
            size={25}
          />
          <Icon
            style={styles.editIcon}
            name="edit"
            onPress={handleEdit}
            size={25}
          />
          <Icon
            style={styles.removeIcon}
            name="delete"
            onPress={handleRemove}
            size={25}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: theme.colors.grey,
    marginVertical: theme.sizes.sm2,
    borderRadius: theme.sizes.borderRadius,
    minHeight: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoItemShrink: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoItemExpand: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    padding: theme.sizes.sm,
    color: theme.colors.black,
    fontSize: theme.sizes.md,
    maxWidth: '90%',
  },
  completedText: {
    padding: theme.sizes.sm,
    color: theme.colors.lightGrey,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: theme.colors.red,
    fontSize: theme.sizes.md,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '45%',
    padding: theme.sizes.sm,
    borderTopRightRadius: theme.sizes.borderRadius,
    borderBottomRightRadius: theme.sizes.borderRadius,
    backgroundColor: theme.colors.lightGreyAlt,
  },
  removeIcon: {
    color: theme.colors.red,
  },
  editIcon: {
    color: theme.colors.blue,
  },
  completeIcon: {
    color: theme.colors.green,
  },
  showMoreIcon: {
    color: theme.colors.black,
    paddingVertical: theme.sizes.sm,
  },
});
