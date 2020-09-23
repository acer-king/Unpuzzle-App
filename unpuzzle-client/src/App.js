import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles/';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import tutoring from './pages/tutoring';
import gradeschool from './pages/gradeschool';
import computerprogramming from './pages/computerprogramming';
import digitalskills from './pages/digitalskills';
import puzzleworld from './pages/puzzleworld';
import innovationineducation from './pages/innovationineducation';

import axios from 'axios';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 
  'https://us-east1-unpuzzle-ad500.cloudfunctions.net/api';

const token = localStorage.FirebaseIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/tutoring" component={tutoring} />
              <Route exact path="/gradeschool" component={gradeschool} />
              <Route exact path="/computerprogramming" component={computerprogramming} />
              <Route exact path="/digitalskills" component={digitalskills} />
              <Route exact path="/puzzleworld" component={puzzleworld} />
              <Route exact path="/innovationineducation" component={innovationineducation} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
              <Route exact path="/users/:handle/puzzlepiece/:puzzlepieceId" component={user} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
