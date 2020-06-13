import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';

const initialState = {
  authenticated: false,
  credentials: {},
  like: [],
  notifications: [],
};

export default function (state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
        // credentials: action.payload.credentials,
        // like: action.payload.like,
        // notifications: action.payload.notifications,
      };
    default:
      return state;
  }
}
