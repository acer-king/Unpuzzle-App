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
import HorizonTabs from './HorizonTab'

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
  const { classes } = props
  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar disableGutters className="nav-container">
          <HorizonTabs></HorizonTabs>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin}></div>
    </Fragment>
  );
};

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  username: state.user.name
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
