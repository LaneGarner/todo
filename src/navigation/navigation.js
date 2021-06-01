import {Navigation} from 'react-native-navigation';

import {Todo} from '../screens/Todo';
import {theme} from '../utils/theme';

export const screenOptions = () => {
  Todo.options = {
    topBar: {
      title: {
        text: 'todo',
        color: theme.colors.white,
      },
    },
  };

  Navigation.setDefaultOptions({
    topBar: {
      title: {
        color: theme.colors.white,
        fontSize: theme.sizes.lg2,
        fontWeight: theme.styles.bold,
        alignment: 'center',
      },
      backButton: {
        color: theme.colors.white,
      },
      background: {
        color: theme.colors.orange,
      },
    },
  });

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Todo',
              },
            },
          ],
        },
      },
    });
  });
};
