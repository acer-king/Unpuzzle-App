import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likePuzzlepiece, unlikePuzzlepiece } from '../../redux/actions/dataActions';


export class LikeButton extends Component {
  likedPuzzlepiece = () => {
    if (
      this.props.user.likes && 
      this.props.user.likes.find(
        like => like.puzzlepieceId === this.props.puzzlepieceId
        )
      )
      return true;
      else return false
  };
  likePuzzlepiece = () => {
    this.props.likePuzzlepiece(this.props.puzzlepieceId)
  }
  unlikePuzzlepiece = () => {
    this.props.unlikePuzzlepiece(this.props.puzzlepieceId)
  }
  render() {
    const { authenticated } = this.props.user
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary"/>
        </MyButton>
      </Link>
    ) : (
      this.likedPuzzlepiece() ? (
        <MyButton tip="Undo like" onClick={this.unlikePuzzlepiece}>
          <FavoriteIcon color="primary"/>
        </MyButton>
      ) : (
        <MyButton tip="Like" onClick={this.likePuzzlepiece}>
          <FavoriteBorder color="primary"/>
        </MyButton>
      )
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  puzzlepieceId: PropTypes.string.isRequired,
  likePuzzlepiece: PropTypes.func.isRequired,
  unlikePuzzlepiece: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = {
  likePuzzlepiece,
  unlikePuzzlepiece
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
