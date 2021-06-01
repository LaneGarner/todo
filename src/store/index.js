import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {todos} from './reducer/todos';

export default createStore(todos, applyMiddleware(thunk));
