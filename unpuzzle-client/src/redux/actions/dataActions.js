import { SET_PUZZLEPIECES, POST_PUZZLEPIECE, LOADING_DATA, LIKE_PUZZLEPIECE, UNLIKE_PUZZLEPIECE, DELETE_PUZZLEPIECE, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI, SET_PUZZLEPIECE, SUBMIT_COMMENT } from '../types';
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
export const getPuzzlepiece = (puzzlepieceId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.get(`/puzzlepiece/${puzzlepieceId}`)
    .then(res => {
      dispatch({ 
        type: SET_PUZZLEPIECE,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch(err => console.log(err));
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
      dispatch(clearErrors());
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
// Submit a comment
export const submitComment = (puzzlepieceId, commentData) => (dispatch) => {
  axios.post(`/puzzlepiece/${puzzlepieceId}/comment`, commentData)
    .then( res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const deletePuzzlepiece = (puzzlepieceId) => (dispatch) => {
  axios.delete(`/puzzlepiece/${puzzlepieceId}`)
    .then(() => {
      dispatch({
        type: DELETE_PUZZLEPIECE,
        payload: puzzlepieceId
      })
    })
    .catch(err => console.log(err));
};

export const getUserData = (userHandle) => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios.get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_PUZZLEPIECES,
        payload: res.data.puzzlepieces
      });
    })
    .catch(() => {
      dispatch({
        type: SET_PUZZLEPIECES,
        payload: null
      });
    });
}

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
} // This is an action creator - when you create a function that dispatches an action