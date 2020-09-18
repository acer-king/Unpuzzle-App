import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Puzzlepiece from '../components/puzzlepiece/Puzzlepiece';
import Profile from '../components/profile/Profile';
import Puzzle from '../components/puzzlepiece/Puzzle';
import axios from 'axios';
import PuzzlepieceSkeleton from '../util/PuzzlepieceSkeleton';
import { connect } from 'react-redux';
import { getPuzzlepieces } from '../redux/actions/dataActions';

const config = require('../aws/api/config.json');

class home extends Component {

  state = {
    newPuzzle: null,
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
      <Fragment>
        <Grid container>
          { /* Curly braces { } are special syntax in JSX. 
            It is used to evaluate a JavaScript expression during compilation. 
            A JavaScript expression can be a variable, function, 
            an object, or any code that resolves into a value. */ }
          {
            this.state.puzzles && this.state.puzzles.length > 0
            ? this.state.puzzles.map(puzzle => <Puzzle puzzleName={puzzle.puzzleName} id={puzzle.id} key={puzzle.id} />)
            : <div>No puzzle available</div>
          }
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={8} xs={12}>
            {recentPuzzlepiecesMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
        </Grid>
      </Fragment>
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
