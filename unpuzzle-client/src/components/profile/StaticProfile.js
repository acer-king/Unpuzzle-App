import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    textAlign: "left",
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    }
  },
  profileImage: {
    width: 200,
    height: 200,
    objectFit: 'cover',
    maxWidth: '100%',
    borderRadius: '50%'
  },
  imageWrapper: {
    textAlign: 'center',
    position: 'relative',
  },
  profileDetails: {
    textAlign: 'center',
    '& span, svg': {
      verticalAlign: 'middle'
    },
    '& a': {
      color: '#00bcd4',
      verticalAlign: 'middle'
    }
  }
});

const StaticProfile = (props) => {
  const { classes, profile: { handle, createdAt, imageUrl, bio, website, location }} = props;

  return (
    <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className={classes.imageWrapper}>
              <img src={imageUrl} alt="profile" className={classes.profileImage}/>
            </div>
            <hr />
            <div className={classes.profileDetails}>
            <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary"/> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary"/>
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {' '}{website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary"/>{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>
          </div>
        </Paper>
  )}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(StaticProfile);