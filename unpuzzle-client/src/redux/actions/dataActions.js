import { SET_PUZZLEPIECES, POST_PUZZLEPIECE, LOADING_DATA, LIKE_PUZZLEPIECE, UNLIKE_PUZZLEPIECE, DELETE_PUZZLEPIECE, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
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

// Post a Puzzlepiece
export const postPuzzlepiece = (newPuzzlepiece) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/puzzlepiece', newPuzzlepiece)
    .then(res => {
      dispatch({
        type: POST_PUZZLEPIECE,
        payload: res.data
      })
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
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
};

export const deletePuzzlepiece = (puzzlepieceId) => (dispatch) => {
  axios.delete(`/puzzlepiece/${puzzlepieceId}`)
    .then(() => {
      dispatch({
        type: DELETE_PUZZLEPIECE,
        payload: puzzlepieceId
      })
    })
    .catch(err => console.log(err));
}