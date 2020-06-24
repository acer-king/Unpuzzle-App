import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Puzzlepiece from '../components/Puzzlepiece';
import Profile from '../components/Profile';

import { connect } from 'react-redux';
import { getPuzzlepieces } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getPuzzlepieces();
  }
  render() {
    const { puzzlepieces, loading } = this.props.data;
    let recentPuzzlepiecesMarkup = !loading ? (
      puzzlepieces.map(puzzlepiece =>
        <Puzzlepiece key={puzzlepiece.puzzlepieceId} puzzlepiece={puzzlepiece} />
      )
    ) : <p>Unpuzzling...</p>
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentPuzzlepiecesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

home.propTypes = {
  getPuzzlepieces: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getPuzzlepieces })(home);
