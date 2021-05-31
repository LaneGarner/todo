import {GET_USERS} from '../action/user';
import USERS from '../../../dummyData';

const initialState = {
  users: USERS,
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.payload};
    default:
      return state;
  }
};
