import { SET_USER, SET_ERRORS, SET_CURNAVINDEX, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from '../types';
import axios from 'axios';
import { Auth, Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports'
// import Amplify from 'aws-amplify'
Amplify.configure(awsconfig)
Auth.configure(awsconfig)

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  // axios
  //   .post('/login', userData)
  //   .then((res) => {
  //     setAuthorizationHeader(res.data.token);
  //     dispatch(getUserData());
  //     dispatch({ type: CLEAR_ERRORS });
  //     history.push('/puzzletweet'); // redirect to homepage after login
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: SET_ERRORS,
  //       payload: err.response.data,
  //     });
  //   });
  Auth.signIn(userData['email'], userData['password']).then(res => {
    // setAuthorizationHeader(res.data.token);
    // dispatch(getUserData());
    // console.log(JSON.stringify(res));
    Auth.currentSession().then(res => {
      const cognitogroups = res.accessToken.payload['cognito:groups'];
      if (cognitogroups == 'Admin') {
        alert("Admin");
        history.push('/');
        dispatch({
          type: SET_CURNAVINDEX,
          payload: 0,
        });
      }
      else if (cognitogroups == 'PremiumUser') {
        alert("PremiumUser");
        history.push('/puzzletweet');
        dispatch({
          type: SET_CURNAVINDEX,
          payload: 1,
        });
      }
      else if (cognitogroups == 'Parent') {
        alert("Parent");
        history.push('/innovationineducation');
        dispatch({
          type: SET_CURNAVINDEX,
          payload: 2,
        });
      }
      else if (cognitogroups == 'Tutor') {
        alert("Tutor");
        history.push('/tutoring');
        dispatch({
          type: SET_CURNAVINDEX,
          payload: 3,
        });
      }
      else if (cognitogroups == 'Student') {
        alert("Student");
        history.push('/puzzleworld');
        dispatch({
          type: SET_CURNAVINDEX,
          payload: 4,
        });
      }
      else {
        alert("Noral User");
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
  // axios
  //   .post('/signup', newUserData)
  //   .then((res) => {
  //     setAuthorizationHeader(res.data.token);
  //     dispatch(getUserData());
  //     dispatch({ type: CLEAR_ERRORS });
  //     history.push('/'); // redirect to homepage after login
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: SET_ERRORS,
  //       payload: err.response.data,
  //     });
  //   });
  newUserData['username'] = newUserData['email'];
  Auth.signUp(newUserData).then(res => {
    // setAuthorizationHeader(res.data.token);
    // dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push(`/confirm/${newUserData['username']}`);
  }).catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: "Please insert valid email and password",
    });
    console.log("checkmeherestart")
    if (err && err.code == 'UsernameExistsException') {
      console.log("checkmeherestart1")
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
