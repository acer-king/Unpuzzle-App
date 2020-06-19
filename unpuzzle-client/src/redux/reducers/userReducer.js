import { SET_USER } from '../types';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER } from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  like: [],
  notifications: [],
};

export default function (state = initialState, action) {
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
        loading: false,
        ...action.payload,
        // ...action.payload can be written as:
        // credentials: action.payload.credentials,
        // like: action.payload.like,
        // notifications: action.payload.notifications,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
