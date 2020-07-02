import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeletePuzzlepiece from './DeletePuzzlepiece';
import PuzzlepieceDialog from './PuzzlepieceDialog';
import LikeButton from './LikeButton';
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icons
import ChatIcon from '@material-ui/icons/Chat';
//Redux
import { connect } from 'react-redux';



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
          <LikeButton puzzlepieceId={puzzlepieceId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary"/>
          </MyButton>
          <span>{commentCount} comments</span>
          <PuzzlepieceDialog puzzlepieceId={puzzlepieceId} userHandle={userHandle} openDialog={this.props.openDialog}/>
        </CardContent>
      </Card>
    );
  }
}

Puzzlepiece.propTypes = {
  user: PropTypes.object.isRequired,
  puzzlepiece: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
  user: state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Puzzlepiece));
