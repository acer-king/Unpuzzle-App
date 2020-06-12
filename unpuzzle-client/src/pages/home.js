import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Puzzlepiece from '../components/Puzzlepiece'

class home extends Component {
  state = {
    puzzlepieces: null
  }
  componentDidMount() {
    axios.get('/puzzlepieces')
      .then(res => {
        this.setState({
          puzzlepieces: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentPuzzlepiecesMarkup = this.state.puzzlepieces ? (
      this.state.puzzlepieces.map(puzzlepiece => (
        <Puzzlepiece key={puzzlepiece.puzzlepieceId} puzzlepiece={puzzlepiece} />
      ))
    ) : <p>Unpuzzling...</p>
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentPuzzlepiecesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    )
  }
}

export default home;
