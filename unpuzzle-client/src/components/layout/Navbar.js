import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostPuzzlepiece from '../puzzlepiece/PostPuzzlepiece';
import Notifications from './Notifications';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Icons
import HomeIcon from '@material-ui/icons/Home';
// Logo
import upLogo from '../../images/upLogo.svg';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  logo: {
    height: "7em"
  }
}))

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar disableGutters className="nav-container">
          <img alt="Company Logo" src={upLogo} className="headerLogo" />
          {authenticated ? (
            <Fragment>
              <PostPuzzlepiece/>
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Tutoring
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Puzzle World
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Innovation in Education
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Schedule A Session
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
