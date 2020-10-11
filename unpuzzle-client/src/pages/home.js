import React from "react";
import Lottie from "react-lottie";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import HeaderAnimation from "../images/svg-assets/unpuzzle-header";
import ButtonArrow from "../components/layout/ButtonArrow";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  animation: {
    maxWidth: "80em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "5%",
    [theme.breakpoints.down("md")]: {
      marginLeft: "auto",
    },
  },
  mainContainer: {
    [theme.breakpoints.down("md")]: {
      marginTop: "1.5em",
      marginBottom: "1em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "3em",
    },
  },
  bookSessionButton: {
    ...theme.themeStyle.button,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 50,
    height: 60,
    width: 300,
    marginRight: 40,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: "1em",
  },
  learnMoreButton: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    borderWidth: 2,
    textTransform: "none",
    borderRadius: 50,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: "0.9rem",
    height: 60,
    width: 150,
  },
  heroTextContainer: {
    minWidth: "40em",
    marginLeft: "1em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: HeaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Grid container direction="column" className={classes.mainContainer}>
      <Grid item>
        {" "}
        {/* ---------Hero Block--------- */}
        <Grid container justify="flex-end" alignItems="center" direction="row">
          <Grid sm item className={classes.heroTextContainer}>
            <Typography variant="h2" align="center">
              Unpuzzle
            </Typography>
            <Typography variant="h3" align="center">
              Collect and Connect Puzzle Pieces
            </Typography>
            <Grid
              container
              justify="center"
              className={classes.buttonContainer}
            >
              <Grid item>
                <Button
                  className={classes.bookSessionButton}
                  variant="contained"
                >
                  Book A Tutoring Session
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" className={classes.learnMoreButton}>
                  <span style={{ marginRight: 10 }}>Learn More</span>
                  <ButtonArrow
                    width={15}
                    height={15}
                    fill={theme.palette.primary.main}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid sm item className={classes.animation}>
            <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {/* Tutoring */}
        <Grid container direction="row">
          <Grid item>
            <Typography variant="h4">
              Online tutoring on a whole new level.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
