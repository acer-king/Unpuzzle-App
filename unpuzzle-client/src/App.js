import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// Components
import Navbar from './components/Navbar';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#1270ac',
      main: '#1ba1f6',
      dark: '#48b3f7',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ac6615',
      main: '#f7931e',
      dark: '#f8a84b',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '20px auto 20px auto',
    width: 100,
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    position: 'relative',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  progress: {
    position: 'absolute',
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
