import React, { Component, Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostPuzzlepiece from '../puzzlepiece/PostPuzzlepiece';
import Notifications from './Notifications';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Icons
import HomeIcon from '@material-ui/icons/Home';
// Logo
import upLogo from '../../images/upLogo.svg';

const styles = theme => ({
  ...theme.themeStyle,
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  headerLogo: {
    height: "6em"
  },
  tab: {
    ...theme.themeStyle.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
    color: 'black'
  },
  button: {
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    fontSize: "1rem",
    textTransform: "none",
    height: "45px"
  },
  appBarBG: {
    background: '#fefefe'
  }

})

const Navbar = (props) => {
    const { classes, authenticated } = props;
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleChange = (e, value) => {
      setValue(value)
    };

    const handleClick = (e) => {
      setAnchorEl(e.currentTarget)
      setOpen(true)
    }

    const handleClose = (e) => {
      setAnchorEl(null)
      setOpen(false)
    }

    useEffect(() => {
      if (window.location.pathname === "/" && value !== 0) {
        setValue(0)
      } else if (window.location.pathname === "/tutoring" && value !== 1) {
        setValue(1)
      } else if (window.location.pathname === "/puzzleworld" && value !== 2) {
        setValue(2)
      } else if (window.location.pathname === "/innovationineducation" && value !== 3) {
        setValue(3)
      } else if (window.location.pathname === "/login" && value !== 4) {
        setValue(4)
      } else if (window.location.pathname === "/signup" && value !== 5) {
        setValue(5)
      } 
    }, [value])
    return (
      <AppBar className={classes.appBarBG}>
        <Toolbar disableGutters className="nav-container">
          <Button 
            component={Link} 
            to="/" 
            onClick={() => setValue(0)} 
            className={classes.logoContainer} 
            disableRipple
          >
            <img alt="Company Logo" src={upLogo} className={classes.headerLogo} />
          </Button>
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
              <Tabs value={value} onChange={handleChange} className="tabContainer" indicatorColor="primary">
                <Tab className={classes.tab} component={Link} to="/" label="Home" />
                <Tab 
                  aria-owns={anchorEl ? "simple-menu" : undefined }
                  aria-haspopup={anchorEl ? true : undefined}
                  className={classes.tab} 
                  component={Link} 
                  onMouseOver={event => handleClick(event)}
                  to="tutoring" 
                  label="Tutoring" 
                />
                <Tab className={classes.tab} component={Link} to="puzzleworld" label="Puzzle World" />
                <Tab className={classes.tab} component={Link} to="innovationineducation" label="Innovation in Education" />
                <Tab className={classes.tab} component={Link} to="login" label="Login" />
                <Tab className={classes.tab} component={Link} to="signup" label="Signup" />
              </Tabs>
              <Button variant="contained" color="secondary" className={classes.button}>
                Book A Tutoring Session
              </Button>
              <Menu id="simple-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{onMouseLeave: handleClose}}>
                <MenuItem onClick={handleClose}>Grade 6 to Grade 12</MenuItem>
                <MenuItem onClick={handleClose}>Computer Programming</MenuItem>
                <MenuItem onClick={handleClose}>Learn Relevant Skills</MenuItem>
              </Menu>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    )
  }


Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
