import React from "react";
import Lottie from "react-lottie";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import HeaderAnimation from "../images/svg-assets/unpuzzle-header";
import ButtonArrow from "../components/layout/ButtonArrow";

const useStyles = makeStyles((theme) => ({}));

export default function Home() {
  const classes = useStyles();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: HeaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container justify="flex-end" direction="row">
          <Grid item>
            <div>
              The most innovative online education platform in the world.
            </div>
            <Grid container>
              <Grid item>
                <Button variant="contained">Book A Tutoring Session</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  Learn More
                  <ButtonArrow width={15} height={15} fill="red" />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.lottie}>
            <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
