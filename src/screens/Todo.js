import React, {useEffect} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import {getTodos} from '../store/action/todos';
import {Item} from '../components/Item';
import {theme} from '../utils/theme';

export const Todo = props => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const loadTodos = () => dispatch(getTodos());

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    Icon.loadFont();
  });

  const goto = (name, text, item) => {
    Navigation.push(props.componentId, {
      component: {
        name: name,
        passProps: {
          item: item,
        },
        options: {
          topBar: {
            title: {
              text: text,
            },
          },
        },
      },
    });
  };

  const gotoNewTodos = () => {
    goto('NewTodo', 'new todo');
  };

  const gotoEditTodo = item => {
    goto('EditTodo', 'edit todo', item);
  };

  return (
    <View style={styles.container}>
      <Icon
        style={styles.addIcon}
        size={80}
        name="plus-circle"
        onPress={gotoNewTodos}
      />
      <Text style={styles.myTodoListHeader}>my todo list:</Text>
      {todos !== null && todos.length === 0 ? (
        <View style={styles.noTodos}>
          <Text style={styles.noTodosText}>there are no todos!</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={todos}
          renderItem={({item}) => (
            <Item gotoEditTodo={gotoEditTodo} item={item} />
          )}
          keyExtractor={item => item.id}
          contextContainerStyle={{alignItems: 'center'}}
        />
      )}
    </View>
  );
  r;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  addIcon: {
    color: theme.colors.black,
    flexDirection: 'column',
    margin: theme.sizes.md,
  },
  myTodoListHeader: {
    textAlign: 'center',
    fontSize: theme.sizes.md,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  noTodos: {
    margin: theme.sizes.md,
  },
  noTodosText: {
    fontSize: theme.sizes.md,
  },
  list: {
    width: '100%',
    justifyContent: 'center',
  },
});
