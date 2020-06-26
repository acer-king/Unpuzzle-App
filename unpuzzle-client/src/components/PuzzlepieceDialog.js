import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import LikeButton from './LikeButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { getPuzzlepiece } from '../redux/actions/dataActions';

const styles = theme => ({
  ...theme.themeStyle,
  invisibleSeperator: {
    border: 'none',
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
})

class PuzzlepieceDialog extends Component {
  state = {
    open: false
  }
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getPuzzlepiece(this.props.puzzlepieceId);
  };
  handleClose = () => {
    this.setState({ open: false });
  }
  render() {
    const { classes, 
      puzzlepiece: { 
        puzzlepieceId, 
        body, 
        createdAt, 
        likeCount, 
        commentCount, 
        userImage, 
        userHandle, 
      }, 
      UI: { loading } 
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={50} thickness={2}/>
      </div>
    ) : (
      <Grid container spacing={4}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage}/>
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`users/${userHandle}`}
            >
              @{userHandle}
            </Typography>
            <hr className={classes.invisibleSeperator}/>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
            </Typography>
            <hr className={classes.invisibleSeperator}/>
            <Typography variant="body1">{body}</Typography>
            <LikeButton puzzlepieceId={puzzlepieceId}/>
            <span>{likeCount} likes</span>
            <MyButton tip="comments">
            <ChatIcon color="primary"/>
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
      </Grid>
    )
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Expand puzzlepiece" tipClassName={classes.expandButton}>
          <UnfoldMore color="primary"></UnfoldMore>
        </MyButton>
        <Dialog
          open={this.state.open} 
          onClose={this.handleClose} 
          fullWidth 
          maxWidth="sm"
        >
          <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
            <CloseIcon/>
          </MyButton>
          <DialogContent className={classes.DialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

PuzzlepieceDialog.propTypes = {
  getPuzzlepiece: PropTypes.func.isRequired,
  puzzlepieceId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  puzzlepiece: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  puzzlepiece: state.data.puzzlepiece,
  UI: state.UI
});

const mapActionsToProps = {
  getPuzzlepiece
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PuzzlepieceDialog))