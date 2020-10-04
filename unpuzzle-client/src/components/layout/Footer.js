import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import footerAdornment from "../../images/Footer_Adornment.svg";
import Hidden from "@material-ui/core/Hidden";

// Social Media Icons
import fbIcon from "../../images/sm-icons/facebook.svg";
import igIcon from "../../images/sm-icons/instagram.svg";
import ytIcon from "../../images/sm-icons/youtube.svg";
import twIcon from "../../images/sm-icons/twitter.svg";
import lnIcon from "../../images/sm-icons/linkedin.svg";
import tkIcon from "../../images/sm-icons/tik-tok.svg";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    zIndex: 1302,
    position: "relative",
  },
  adornment: {
    width: "25em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "21em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em",
    },
  },
  mainContainer: {
    position: "absolute",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  link: {
    color: "white",
    fontFamily: "Montserrat",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  gridItem: {
    margin: "3em",
  },
  icon: {
    height: "3em",
    width: "3em",
    [theme.breakpoints.down("xs")]: {
      height: "0.5em",
      width: "0.5em",
    },
    [theme.breakpoints.down("md")]: {
      height: "2em",
      width: "2em",
      right: "1.5em",
    },
  },
  socialContainer: {
    position: "absolute",
    marginTop: "-5em",
    right: "3.2em",
    backgroundColor: "white",
    width: "24em",
    borderRadius: "0.5em",
    [theme.breakpoints.down("xs")]: {
      width: "18em",
      marginTop: "-3.5em",
    },
    [theme.breakpoints.down("md")]: {
      width: "18em",
      marginTop: "-4.5em",
      right: "1.5em",
    },
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Grid container justify="center" className={classes.mainContainer}>
        <Hidden mdDown>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(0)}
                to="/"
                className={classes.link}
              >
                Home
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(0);
                }}
                to="/tutoring"
                className={classes.link}
              >
                Tutoring
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(1);
                }}
                to="/gradeschool"
                className={classes.link}
              >
                Grade 6 - Grade 12
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(2);
                }}
                to="/computerprogramming"
                className={classes.link}
              >
                Computer Programming
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(3);
                }}
                to="/digitalskills"
                className={classes.link}
              >
                Digital Skills
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(2)}
                to="/puzzleworld"
                className={classes.link}
              >
                Puzzle World
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(2)}
                to="/puzzleworld/ecommerce"
                className={classes.link}
              >
                E-commerce
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(2)}
                to="/puzzleworld/websitedevelopment"
                className={classes.link}
              >
                Website Development
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(2)}
                to="/puzzleworld/webappdevelopment"
                className={classes.link}
              >
                Web App Development
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(2)}
                to="/puzzleworld/digitalmarketing"
                className={classes.link}
              >
                Digital Marketing
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(2)}
                to="/puzzleworld/tech"
                className={classes.link}
              >
                Tech
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(2)}
                to="/puzzleworld/basketball"
                className={classes.link}
              >
                Basketball
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(3)}
                to="/innovationineducation"
                className={classes.link}
              >
                Innovation in Education
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(3)}
                to="/innovationineducation/what-is-unpuzzle"
                className={classes.link}
              >
                What is Unpuzzle?
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(3)}
                to="/innovationineducation/about-the-founder"
                className={classes.link}
              >
                About the Founder
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(3)}
                to="/innovationineducation/puzzlepieces"
                className={classes.link}
              >
                Puzzle Pieces
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              component={Link}
              onClick={() => props.setValue(4)}
              to="/login"
              className={classes.link}
            >
              Login
            </Grid>
            <Grid
              item
              component={Link}
              onClick={() => props.setValue(5)}
              to="/signup"
              className={classes.link}
            >
              Signup
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <img
        alt="black decorative slash"
        src={footerAdornment}
        className={classes.adornment}
      />
      <Grid
        container
        justify="flex-end"
        spacing={2}
        className={classes.socialContainer}
      >
        <Grid
          item
          component={"a"}
          href="https://facebook.com/unpuzzle.co"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="Facebook Logo" src={fbIcon} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://instagram.com/unpuzzle.co"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="Instagram Logo" src={igIcon} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.youtube.com/channel/UCX-jX5o5UxQ6nPTPSu0ZFPA/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="YouTube Logo" src={ytIcon} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://twitter.com/unpuzzleco"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="Twitter Logo" src={twIcon} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.linkedin.com/company/unpuzzle-co/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="Linkedin Logo" src={lnIcon} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.tiktok.com/@unpuzzle"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="Tik-Tok Logo" src={tkIcon} className={classes.icon} />
        </Grid>
      </Grid>
    </footer>
  );
}
