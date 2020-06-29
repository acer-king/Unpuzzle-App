import { SET_PUZZLEPIECES, SET_PUZZLEPIECE, POST_PUZZLEPIECE, LIKE_PUZZLEPIECE, UNLIKE_PUZZLEPIECE, LOADING_DATA, DELETE_PUZZLEPIECE, SUBMIT_COMMENT } from '../types';

const initialState = {
  puzzlepieces: [],
  puzzlepiece: {},
  loading: false
}

export default function(state = initialState, action){
  let index;
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
    case SET_PUZZLEPIECE:
      return {
        ...state,
        puzzlepiece: action.payload
      }
    case LIKE_PUZZLEPIECE:
    case UNLIKE_PUZZLEPIECE:
      index = state.puzzlepieces.findIndex((puzzlepiece) => puzzlepiece.puzzlepieceId === action.payload.puzzlepieceId);
      state.puzzlepieces[index] = action.payload;
      if(state.puzzlepiece.puzzlepieceId === action.payload.puzzlepieceId){
        state.puzzlepiece = action.payload;
      }
      return {
        ...state
      };
    case DELETE_PUZZLEPIECE:
      index = state.puzzlepieces.findIndex(puzzlepiece => puzzlepiece.puzzlepieceId === action.payload);
      state.puzzlepieces.splice(index, 1);
      console.log(action.payload)
      console.log(index)
      return {
        ...state
      }
    case POST_PUZZLEPIECE:
      return {
        ...state,
        puzzlepieces: [
          action.payload,
          ...state.puzzlepieces
        ]
      }
    case SUBMIT_COMMENT:
      return {
        ...state,
        puzzlepiece: {
          ...state.puzzlepiece,
          comments: [action.payload, ...state.puzzlepiece.comments]
        }
      }
    default:
      return state;
  }
}