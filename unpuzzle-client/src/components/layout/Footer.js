import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import footerAdornment from '../../images/Footer_Adornment.svg';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    zIndex: 1302
  },
  adornment: {
    width: "25em",
    verticalAlign: "bottom",
      [theme.breakpoints.down("md")]: {
        width: "21em"
      },
      [theme.breakpoints.down("xs")]: {
        width: "15em"
      },
  },
  mainContainer: {
    position: "absolute"
  },
  link: {
    color: "white",
    fontFamily: "Montserrat",
    fontSize: "0.75rem",
    fontWeight: "bold"
  },
  gridItem: {
    margin: "3em"
  }
}))

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
      <Grid container justify="center" className={classes.mainContainer}>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid item component={Link} onClick={() => props.setValue(0)} to="/" className={classes.link}>
              Home
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid item component={Link} onClick={() => {props.setValue(1); props.setSelectedIndex(0)}} to="/tutoring" className={classes.link}>
              Tutoring
            </Grid>
            <Grid item component={Link} onClick={() => {props.setValue(1); props.setSelectedIndex(1)}} to="/gradeschool" className={classes.link}>
              Grade 6 - Grade 12
            </Grid>
            <Grid item component={Link} onClick={() => {props.setValue(1); props.setSelectedIndex(2)}} to="/computerprogramming" className={classes.link}>
              Computer Programming
            </Grid>
            <Grid item component={Link} onClick={() => {props.setValue(1); props.setSelectedIndex(3)}} to="/digitalskills" className={classes.link}>
              Digital Skills
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid item component={Link} onClick={() => props.setValue(2)} to="/puzzleworld" className={classes.link}>
              Puzzle World
            </Grid>
            <Grid item component={Link} onClick={() => props.setValue(2)} to="/puzzleworld/ecommerce" className={classes.link}>
              E-commerce
            </Grid>
            <Grid item component={Link} onClick={() => props.setValue(2)} to="/puzzleworld/websitedevelopment" className={classes.link}>
              Website Development
            </Grid>
            <Grid item component={Link} onClick={() => props.setValue(2)} to="/puzzleworld/webappdevelopment" className={classes.link}>
              Web App Development
            </Grid>
            <Grid item component={Link} onClick={() => props.setValue(2)} to="/puzzleworld/digitalmarketing" className={classes.link}>
              Digital Marketing
            </Grid>
            <Grid item component={Link} onClick={() => props.setValue(2)} to="/puzzleworld/tech" className={classes.link}>
              Tech
            </Grid>
            <Grid item component={Link} onClick={() => props.setValue(2)} to="/puzzleworld/basketball" className={classes.link}>
              Basketball
            </Grid>
          </Grid>
        </Grid>      
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid item component={Link} onClick={() => props.setValue(3)} to="/innovationineducation" className={classes.link}>
              Innovation in Education
            </Grid>
            <Grid item component={Link} onClick={() => props.setValue(3)} to="/innovationineducation/what-is-unpuzzle" className={classes.link}>
              What is Unpuzzle?
            </Grid>
            <Grid item component={Link} onClick={() => props.setValue(3)} to="/innovationineducation/about-the-founder" className={classes.link}>
              About the Founder
            </Grid>
            <Grid item component={Link} onClick={() => props.setValue(3)} to="/innovationineducation/puzzlepieces" className={classes.link}>
              Puzzle Pieces
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid item component={Link} onClick={() => props.setValue(4)} to="/login" className={classes.link}>
              Login
            </Grid>
            <Grid item component={Link} onClick={() => props.setValue(5)} to="/signup" className={classes.link}>
              Signup
            </Grid>
          </Grid>
        </Grid>      
      </Grid>
      </Hidden>
      <img alt="black decorative slash" src={footerAdornment} className={classes.adornment}/>
    </footer>
  )
}

