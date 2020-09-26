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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
// Logo
import upLogo from '../../images/upLogo.svg';

const styles = theme => ({
  ...theme.themeStyle,
  toolbarMargin: {
      ...theme.mixins.toolbar,
      marginBottom: "4em",
      [theme.breakpoints.down("md")]: {
        marginBottom: "2.25em"
      },
      [theme.breakpoints.down("xs")]: {
        marginBottom: "1.25em"
      }
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  headerLogo: {
    height: "6em",
    [theme.breakpoints.down("md")]: {
      height: "5em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "4.5em"
    }
  },
  tab: {
    ...theme.themeStyle.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
    color: 'black',
    opacity: 0.7
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
  },
  menu: {
    backgroundColor: "#fefefe",
    borderRadius: "0"
  },
  menuItem: {
    ...theme.themeStyle.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawerIcon: {
    height: "50px",
    width: "50px"
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawer: {
    backgroundColor: theme.palette.primary.main
  },
  drawerItem: {
    ...theme.themeStyle.typography.tab,
    color: "white",
    opacity: 0.7
  },
  drawerItemSession: {
    backgroundColor: theme.palette.secondary.main
  },
  drawerItemSelected: {
    opacity: 1
  }
})

const Navbar = (props) => {
  const { classes, authenticated } = props;
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false)
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue)
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpenMenu(true)
  }

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
    setOpenMenu(false)
  }

  const menuOptions = [
    {name: "Tutoring", link: "/tutoring"},
    {name: "Grade 6 to Grade 12", link: "/gradeschool"},
    {name: "Computer Programming", link: "/computerprogramming"},
    {name: "Digita Skills", link: "/digitalskills"}
  ]

  const routes =
    [
      {name: "Home", link: "/"}, {name: "Tutoring", link: "/tutoring"}, 
      {name: "Puzzle World", link: "/puzzleworld"}, 
      {name: "Innovation in Education", link: "/innovationineducation"}, 
      {name: "Login", link: "/login"}, {name: "Signup", link: "/signup"}
    ]

  useEffect(() => {
    

    switch (window.location.pathname) {
      case "/":
        if (value !== 0) {
          setValue(0);
        }
        break;
      case "/tutoring":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0)
        }
        break;
      case "/gradeschool":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1)
        }
        break;
      case "/computerprogramming":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;
      case "/digitalskills":
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(3)
        }
        break;
      case "/puzzleworld":
        if (value !== 2) {
          setValue(2)
        }
        break;
      case "/innovationineducation":
        if (value !==3) {
          setValue (3)
        }
        break;
      case "/login":
        if (value !==4) {
          setValue (4)
        }
        break;
      case "/signup":
        if (value !==5) {
          setValue (5)
        }
        break;
      case "/session":
        if (value !==6) {
          setValue (6)
        }
        break;
      default:
        break;
    }
  }, [value])
    
  const tabs = (
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
      <Menu 
        id="simple-menu" 
        anchorEl={anchorEl} 
        open={openMenu} 
        onClose={handleClose} 
        MenuListProps={{onMouseLeave: handleClose}}
        classes={{paper: classes.menu}}
        elevation={0}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={option}
            component={Link} 
            to={option.link}
            classes={{root: classes.menuItem}}
            onClick={(event) => {handleMenuItemClick(event, i); setValue(1); handleClose()}}
            selected={i === selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}  
      </Menu>
    </Fragment>
  )

  const drawer = (
    <Fragment>
      <SwipeableDrawer 
        disableBackdropTransition={!iOS} 
        disableDiscovery={iOS} open={openDrawer} 
        onClose={() => setOpenDrawer(false)} 
        onOpen={()=>setOpenDrawer(true)}
        classes={{paper: classes.drawer}}
      >
        <List>
          <ListItem 
            onClick={() => {setOpenDrawer(false); setValue(0)}} 
            divider
            button 
            component={Link} 
            to="/" 
            selected={value === 0}
          >
            <ListItemText 
              className={value === 0 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} 
              disableTypography
            >
              Home
            </ListItemText>
          </ListItem>
          <ListItem 
            onClick={() => {setOpenDrawer(false); setValue(1)}} 
            divider 
            button 
            component={Link} 
            to="/tutoring"
            selected={value === 1}
          >
            <ListItemText 
              className={value === 1 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} 
              disableTypography
            >
              Tutoring
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => {setOpenDrawer(false); setValue(2)}} divider button component={Link} to="/puzzleworld" selected={value === 2}>
            <ListItemText 
              className={value === 2 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} 
              disableTypography
            >
              Puzzle World
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => {setOpenDrawer(false); setValue(3)}} divider button component={Link} to="/innovationineducation" selected={value === 3}>
            <ListItemText 
              className={value === 3 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} 
              disableTypography
            >
              Innovation in Education
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => {setOpenDrawer(false); setValue(4)}} divider button component={Link} to="/Login" selected={value === 4}>
            <ListItemText 
              className={value === 4 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} 
              disableTypography
            >
              Login
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => {setOpenDrawer(false); setValue(5)}} divider button component={Link} to="/signup" selected={value === 5}>
            <ListItemText 
              className={value === 5 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} 
              disableTypography
            >
              Sign Up
            </ListItemText>
          </ListItem>
          <ListItem className={classes.drawerItemSession} onClick={() => {setOpenDrawer(false); setValue(6)}} divider button component={Link} to="/session" selected={value === 6}>
          <ListItemText 
              className={value === 6 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} 
              disableTypography
            >
              Book a Tutoring Session
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
        <MenuIcon className={classes.drawerIcon}/>
      </IconButton>
    </Fragment>
  )

  return (
    <Fragment>
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
              {matches ? drawer : tabs}
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin}></div>
    </Fragment>
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
