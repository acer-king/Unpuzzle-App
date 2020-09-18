import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Puzzlepiece from '../components/puzzlepiece/Puzzlepiece';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import PuzzlepieceSkeleton from '../util/PuzzlepieceSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';


class user extends Component {
  state = {
    profile: null,
    puzzlepieceIdParam: null
  }
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const puzzlepieceId = this.props.match.params.puzzlepieceId;

    if(puzzlepieceId) this.setState({ puzzlepieceIdParam: puzzlepieceId });


    this.props.getUserData(handle);
    axios.get(`/user/${handle}`)
      .then(res => {
        console.log(res.data.user)
        this.setState({
          profile: res.data.user
        })
      })
      .catch(err => console.log(err));
  }
  render() {
    const { puzzlepieces, loading } = this.props.data;
    const { puzzlepieceIdParam } = this.state;
    const puzzlepiecesMarkup = loading ? (
      <PuzzlepieceSkeleton/>
    ) : puzzlepieces === null ? (
      <p>No puzzlepieces </p>
    ) : !puzzlepieceIdParam ? (
      puzzlepieces.map(puzzlepiece => <Puzzlepiece key={puzzlepiece.puzzlepieceId} puzzlepiece={puzzlepiece} />)
    ) : (
      puzzlepieces.map(puzzlepiece => {
        if(puzzlepiece.puzzlepieceId !== puzzlepieceIdParam)
          return <Puzzlepiece key={puzzlepiece.puzzlepieceId} puzzlepiece={puzzlepiece} />
        else return <Puzzlepiece key={puzzlepiece.puzzlepieceId} puzzlepiece={puzzlepiece} openDialog/>
      })
    )
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {puzzlepiecesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton/>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    )
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, { getUserData } )(user);
