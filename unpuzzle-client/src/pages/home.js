import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Puzzlepiece from '../components/puzzlepiece/Puzzlepiece';
import Profile from '../components/profile/Profile';
import Puzzle from '../components/puzzlepiece/Puzzle';
import axios from 'axios';
import PuzzlepieceSkeleton from '../util/PuzzlepieceSkeleton';
import { connect } from 'react-redux';
import { getPuzzlepieces } from '../redux/actions/dataActions';

const config = require('../aws/api/config.json');

const useStyles = makeStyles(theme => ({
  pushDown: {
    height: "2000px"
  }
}))

class home extends Component {

  state = {
    puzzles: []
  }

  fetchPuzzles = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/puzzle`);
      this.setState({ puzzles: res.data })
      console.log(res.data)
    } catch (err) {
      console.log(`An error has occured ${err}`);
    }
  }

  componentDidMount() {
    this.fetchPuzzles();
    this.props.getPuzzlepieces();
  }
  render() {
    const { puzzlepieces, loading } = this.props.data;
    let recentPuzzlepiecesMarkup = !loading ? (
      puzzlepieces.map(puzzlepiece =>
        <Puzzlepiece key={puzzlepiece.puzzlepieceId} puzzlepiece={puzzlepiece} />
      )
    ) : (
      <PuzzlepieceSkeleton/>
    );
    return (
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row">
            <Grid item>
              <div>
                Unpuzzle
                <br />
                The most innovative online tutoring platform in the world.
              </div>
            </Grid>
            <Grid container>
              <Grid item>
                <Button variant="outlined">
                  Schedule a Session
                </Button>
              </Grid>
            </Grid>
          </Grid>
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
