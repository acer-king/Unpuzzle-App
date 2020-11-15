import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Row } from 'antd';
import SearchBar from "material-ui-search-bar";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MyButton from '../../util/MyButton';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1500,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
}));

export default function HorizonTabs() {
  const [seachstring, setSearchString] = useState("")
  const doSomethingWith = (searchVal) => {
    console.log("checkmehere", searchVal)
  }
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={`${classes.root} `}>
      <h2>DashBoard</h2>
      <h2>Message</h2>
      <SearchBar
        value={seachstring}
        onChange={(newValue) => setSearchString(newValue)}
        onRequestSearch={() => doSomethingWith(seachstring)}
      />
      <MyButton>
        <NotificationsIcon></NotificationsIcon>
      </MyButton>
      <MyButton>
        <PowerSettingsNewIcon></PowerSettingsNewIcon>
      </MyButton>
    </div>
  );
}
