import React from 'react';
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core/styles';

import animationData from '../images/svg-assets/unpuzzle-header';

const useStyles = makeStyles(theme => ({

}))

export default function Home() {
  const classes = useStyles();

  const defaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return <Lottie options={defaultOptions} height={"100%"} width={"75%"} />
}