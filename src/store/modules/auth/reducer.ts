import {Reducer} from 'redux';
import {IAuth} from '../../../types';

const INITIAL_STATE = {};

const AuthToken: Reducer<IAuth | any> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_TOKEN': {
      const {auth} = action.payload;
      return {
        ...state,
        auth: auth,
      };
    }

    default: {
      return state;
    }
  }
};

export default AuthToken;
