import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeletePuzzlepiece from './DeletePuzzlepiece';
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//Redux
import { connect } from 'react-redux';
import { likePuzzlepiece, unlikePuzzlepiece } from '../redux/actions/dataActions';



const styles = {
  card: {
    position: 'relative',
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 110,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

class Puzzlepiece extends Component {
  likedPuzzlepiece = () => {
    if (
      this.props.user.likes && 
      this.props.user.likes.find(
        like => like.puzzlepieceId === this.props.puzzlepiece.puzzlepieceId
        )
      )
      return true;
      else return false
  };
  likePuzzlepiece = () => {
    this.props.likePuzzlepiece(this.props.puzzlepiece.puzzlepieceId)
  }
  unlikePuzzlepiece = () => {
    this.props.unlikePuzzlepiece(this.props.puzzlepiece.puzzlepieceId)
  }
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      puzzlepiece: {
        body,
        createdAt,
        userImage,
        userHandle,
        puzzlepieceId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: {
          handle
        }
      }
    } = this.props;
    // const classes = this.props.classes *Destructuring concept*
    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary"/>
        </Link>
      </MyButton>
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
    const deleteButton = authenticated && userHandle === handle ? (
      <DeletePuzzlepiece puzzlepieceId={puzzlepieceId}/>
    ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary"/>
          </MyButton>
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}

Puzzlepiece.propTypes = {
  likePuzzlepiece: PropTypes.func.isRequired,
  unlikePuzzlepiece: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  puzzlepiece: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = {
  likePuzzlepiece,
  unlikePuzzlepiece
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Puzzlepiece));
