import { SET_USER, SET_ERRORS, SET_CURNAVINDEX, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from '../types';
import axios from 'axios';
import { Auth, Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports'
// import Amplify from 'aws-amplify'
Amplify.configure(awsconfig)
Auth.configure(awsconfig)

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  Auth.signIn(userData['email'], userData['password']).then(res => {

    Auth.currentUserInfo().then(userInfo => {
      dispatch({
        type: SET_USER,
        payload: userInfo['attributes']
      })
    }).catch(err => {
      console.log(JSON.stringify(err));
    })

    Auth.currentSession().then(res => {
      const cognitogroups = res.accessToken.payload['cognito:groups'];
      console.log(cognitogroups, "checkmehere");
      if (cognitogroups == 'Admin') {
        history.push('/');
        dispatch({
          type: SET_CURNAVINDEX,
          payload: 0,
        });
      }
      else if (cognitogroups == 'PremiumUser') {
        history.push('/puzzletweet');
        dispatch({
          type: SET_CURNAVINDEX,
          payload: 1,
        });
      }
      else if (cognitogroups == 'Parent') {
        history.push('/innovationineducation');
        dispatch({
          type: SET_CURNAVINDEX,
          payload: 2,
        });
      }
      else if (cognitogroups == 'Tutor') {
        history.push('/tutoring');
        dispatch({
          type: SET_CURNAVINDEX,
          payload: 3,
        });
      }
      else if (cognitogroups == 'Student') {
        history.push('/puzzleworld');
        dispatch({
          type: SET_CURNAVINDEX,
          payload: 4,
        });
      }
      else if (cognitogroups == 'Teacher') {
      }
      else {
        history.push('/gradeschool');
        dispatch({
          type: SET_CURNAVINDEX,
          payload: 4,
        });
      }
    });
    dispatch({ type: CLEAR_ERRORS });
  }).catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: "invalid username or password",
    });
  })

};

export const signupUser = (newUserData, history) => (dispatch) => {

  dispatch({ type: LOADING_UI });

  newUserData['attributes'] = { 'name': newUserData['username'] }
  newUserData['username'] = newUserData['email']

  Auth.signUp(newUserData).then(res => {

    dispatch({ type: CLEAR_ERRORS });
    history.push(`/confirm/${newUserData['username']}`);
  }).catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: "Please insert valid email and password",
    });
    if (err && err.code == 'UsernameExistsException') {
      history.push(`/confirm/${newUserData['username']}`);
    }
  });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FirebaseIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED })
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios.post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err))
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const markNotificationsRead = (notificationIds) => dispatch => {
  axios.post('/notifications', notificationIds)
    .then(res => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      })
    })
    .catch(err => console.log(err));
}

const setAuthorizationHeader = (token) => {
  const FirebaseIdToken = `Bearer ${token}`;
  localStorage.setItem('FirebaseIdToken', FirebaseIdToken);
  axios.defaults.headers.common['Authorization'] = FirebaseIdToken;
};
