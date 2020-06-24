import { SET_PUZZLEPIECES, LOADING_DATA, LIKE_PUZZLEPIECE, UNLIKE_PUZZLEPIECE } from '../types';
import axios from 'axios';

// Get all puzzlepieces
export const getPuzzlepieces = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get('/puzzlepieces')
    .then(res => {
      dispatch({
        type: SET_PUZZLEPIECES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_PUZZLEPIECES,
        payload: []
      })
    })
}

// Like a puzzlepiece
export const likePuzzlepiece = (puzzlepieceId) => (dispatch) => {
  axios.get(`/puzzlepiece/${puzzlepieceId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_PUZZLEPIECE,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}
// Unlike a puzzlepiece
export const unlikePuzzlepiece = (puzzlepieceId) => (dispatch) => {
  axios.get(`/puzzlepiece/${puzzlepieceId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_PUZZLEPIECE,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}