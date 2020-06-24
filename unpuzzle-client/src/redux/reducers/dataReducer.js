import { SET_PUZZLEPIECES, LIKE_PUZZLEPIECE, UNLIKE_PUZZLEPIECE, LOADING_DATA } from '../types';

const initialState = {
  puzzlepieces: [],
  puzzlepiece: {},
  loading: false
}

export default function(state = initialState, action){
  switch(action.type){
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SET_PUZZLEPIECES:
      return {
        ...state,
        puzzlepieces: action.payload,
        loading: false
      }
    case LIKE_PUZZLEPIECE:
    case UNLIKE_PUZZLEPIECE:
      let index = state.puzzlepieces.findIndex((puzzlepiece) => puzzlepiece.puzzlepieceId === action.payload.puzzlepieceId);
      state.puzzlepieces[index] = action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
}