import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import PostPuzzlepiece from "../puzzlepiece/PostPuzzlepiece";
import Notifications from "./Notifications";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from '@material-ui/core/Avatar';

// Icons
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
// Logo
import upLogo from "../../images/upLogo.svg";
import { logoutUser } from "../../redux/actions/userActions";

const styles = (theme) => {
  return {
    ...theme.themeStyle,
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    toolbarMargin: {
      ...theme.mixins.toolbar,
      marginBottom: "1.1em",
      [theme.breakpoints.down("md")]: {
        marginBottom: "1em",
      },
      [theme.breakpoints.down("xs")]: {
        marginBottom: "1.25em",
      },
    },
    logoContainer: {
      padding: 0,
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    headerLogo: {
      height: "6em",
      [theme.breakpoints.down("md")]: {
        height: "5em",
      },
      [theme.breakpoints.down("xs")]: {
        height: "4.5em",
      },
    },
    tab: {
      ...theme.themeStyle.typography.tab,
      minWidth: 10,
      marginLeft: "25px",
      color: "black",
      opacity: 0.7,
    },
    button: {
      borderRadius: "50px",
      marginLeft: "50px",
      marginRight: "25px",
      fontSize: "1rem",
      textTransform: "none",
      height: "45px",
      "&:hover": {
        backgroundColor: theme.palette.secondary.light,
      },
    },
    appbar: {
      background: "#fefefe",
      zIndex: theme.zIndex.modal + 1,
    },
    menu: {
      backgroundColor: "#fefefe",
      borderRadius: "0",
    },
    menuItem: {
      ...theme.themeStyle.typography.tab,
      opacity: 0.7,
      "&:hover": {
        opacity: 1,
      },
    },
    drawerIcon: {
      height: "50px",
      width: "50px",
    },
    drawerIconContainer: {
      marginLeft: "auto",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    drawer: {
      backgroundColor: theme.palette.primary.main,
    },
    drawerItem: {
      ...theme.themeStyle.typography.tab,
      color: "white",
      opacity: 0.7,
    },
    drawerItemSession: {
      backgroundColor: theme.palette.secondary.main,
    },
    drawerItemSelected: {
      "& .MuiListItemText-root": {
        opacity: 1,
      },
    },
  }
};

const Navbar = (props) => {
  const { classes, authenticated, username, groupid } = props;
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);



  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };
  const handleClickOnNav = (navName) => {
    if (navName == "Logout") {
      props.logoutUser()
    }
  }

  const menuOptions = [
    { name: "Tutoring", link: "/tutoring", activeIndex: 1, selectedIndex: 0 },
    {
      name: "Grade 6 to Grade 12",
      link: "/gradeschool",
      activeIndex: 1,
      selectedIndex: 1,
    },
    {
      name: "Computer Programming",
      link: "/computerprogramming",
      activeIndex: 1,
      selectedIndex: 2,
    },
    {
      name: "Digita Skills",
      link: "/digitalskills",
      activeIndex: 1,
      selectedIndex: 3,
    },
  ];

  const guestRoutes = [
    { name: "Home", link: "/", activeIndex: 0 },
    {
      name: "Tutoring",
      link: "/tutoring",
      activeIndex: 1,
      mouseOver: (event) => handleClick(event),
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaHasPopup: anchorEl ? true : undefined,
    },
    { name: "Puzzle Tweet", link: "/puzzletweet", activeIndex: 2 },
    { name: "Puzzle World", link: "/puzzleworld", activeIndex: 3 },
    {
      name: "Innovation in Education",
      link: "/innovationineducation",
      activeIndex: 4,
    },
    { name: "Login", link: "/login", activeIndex: 5 },
    { name: "Signup", link: "/signup", activeIndex: 6 },
    { name: "Logout", link: "/", activeIndex: 0 },
  ];

  const groupnames = ['Admin', 'PremiumUser', 'Parent', 'Tutor', 'Student', 'Teacher']

  const location = useLocation();
  useEffect(() => {
    [...menuOptions, ...guestRoutes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex);
            if (
              route.selectedIndex &&
              route.selectedIndex !== props.selectedIndex
            ) {
              props.setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
    if (location.pathname == '/') {
      props.setSelectedIndex(0);
    }
    else if (location.pathname == '/tutoring') {
      props.setSelectedIndex(1);
    }
    else if (location.pathname == '/puzzleworld') {
      props.setSelectedIndex(2);
    }
    else if (location.pathname == '/puzzletweet') {
      props.setSelectedIndex(3);
    }
    else if (location.pathname == '/innovationineducation') {
      props.setSelectedIndex(4);
    }
    else {
      props.setSelectedIndex(null);
    }
  }, [props.value, menuOptions, props.selectedIndex, guestRoutes, props, location]);

  const guestUserTabs = (
    <Fragment>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className="tabContainer"
        indicatorColor="primary"
      >
        {guestRoutes.map((route, i) => (
          authenticated ? (
            (route.name == "Login" || route.name == "Signup") ? null :
              <Tab
                key={`${route}${i}`}
                className={classes.tab}
                component={Link}
                to={route.link}
                label={route.name}
                onMouseOver={route.mouseOver}
                aria-owns={route.ariaOwns}
                aria-haspopup={route.ariaHasPopup}
                onClick={e => { handleClickOnNav(route.name) }}
              />
          ) :
            (
              route.name == "Logout" ? null :
                <Tab
                  key={`${route}${i}`}
                  className={classes.tab}
                  component={Link}
                  to={route.link}
                  label={route.name}
                  onMouseOver={route.mouseOver}
                  aria-owns={route.ariaOwns}
                  aria-haspopup={route.ariaHasPopup}
                />
            )
        ))}
      </Tabs>
      {authenticated ? (
        < Button
          component={Link}
          to="/"
          tip="acer"
          onClick={() => props.setValue(0)}
          className={`${classes.logoContainer} Navbar-tab-16`}
          disableRipple
        >
          <Avatar alt="Remy Sharp" className={classes.large} />
          <span>{username}</span>
          <span>{username ?? groupnames[groupid]}</span>
        </Button>
      ) : null
      }

      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        component={Link}
        to="/bookasession"
      >
        Book A Tutoring Session
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={`${option}${i}`}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(event) => {
              handleMenuItemClick(event, i);
              props.setValue(1);
              handleClose();
            }}
            selected={i === props.selectedIndex && props.value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment >
  );

  const loggedInTabs = (
    <Fragment>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className="tabContainer"
        indicatorColor="primary"
      >
        {guestRoutes.map((route, i) => (
          <Tab
            key={`${route}${i}`}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            onMouseOver={route.mouseOver}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaHasPopup}
          />
        ))}
      </Tabs>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        component={Link}
        to="/bookasession"
      >
        Book A Tutoring Session
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={`${option}${i}`}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(event) => {
              handleMenuItemClick(event, i);
              props.setValue(1);
              handleClose();
            }}
            selected={i === props.selectedIndex && props.value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );

  const guestUserDrawer = (
    <Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin}></div>
        <List>
          {guestRoutes.map((route) => (
            <ListItem
              classes={{ selected: classes.drawerItemSelected }}
              key={`${route}${route.activeIndex}`}
              divider
              button
              component={Link}
              to={route.link}
              selected={props.value === route.activeIndex}
              onClick={() => {
                setOpenDrawer(false);
                props.setValue(route.activeIndex);
              }}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            classes={{
              root: classes.drawerItemSession,
              selected: classes.drawerItemSelected,
            }}
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(6);
            }}
            divider
            button
            component={Link}
            to="/bookasession"
            selected={props.value === 6}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Book a Tutoring Session
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </Fragment>
  );
  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar disableGutters className="nav-container">
          {authenticated ? (
            <Fragment>
              {/* <PostPuzzlepiece />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Link to="/puzzletweet">
                <MyButton tip="Home">
                  Puzzle Tweet
                </MyButton>
              </Link>
              <Notifications /> */}
              {guestUserTabs}
            </Fragment>
          ) : (
              <Fragment>{matches ? guestUserDrawer : guestUserTabs}
              </Fragment>
            )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin}></div>
    </Fragment>
  );
};

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapActionToProps = { logoutUser }
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  username: state.user.name
});

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Navbar));
