export default {
  palette: {
    primary: {
      light: '#1270ac',
      main: '#1ba1f6',
      dark: '#48b3f7',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ac6615',
      main: '#f7931e',
      dark: '#f8a84b',
      contrastText: '#fff',
    },
  },
  themeStyle: {
    typoography: {
      useNextVariants: true,
    },
    form: {
      textAlign: 'center',
    },
    image: {
      margin: '20px auto 20px auto',
      width: 100,
    },
    pageTitle: {
      margin: '10px auto 10px auto',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      marginTop: 20,
      position: 'relative',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
    },
    progress: {
      position: 'absolute',
    },
    invisibleSeperator: {
      border: 'none',
      margin: 4
    },
    visibleSeparator: {
      width:'100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    }
  },
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
  button: {
    '&:hover': {
      cursor: 'pointer'
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
    '& button': {
      position: 'absolute',
      top: '80%',
      left: '70%'
    }
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
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
};
