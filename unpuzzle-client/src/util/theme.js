import { createMuiTheme } from "@material-ui/core/styles";
const ppBlue = "#1ba1f6";
const ppOrange = "#f7931e";

const theme = createMuiTheme();

export default createMuiTheme({
  palette: {
    primary: {
      light: "#48b3f7",
      main: `${ppBlue}`,
      dark: "#1270ac",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f8a84b",
      main: `${ppOrange}`,
      dark: "#ac6615",
      contrastText: "#fff",
    },
  },
  typography: {
    h2: {
      fontFamily: "Montserrat",
      fontWeight: 600,
      fontSize: "2.5rem",
      color: `${ppBlue}`,
      lineHeight: 1.5,
      [theme.breakpoints.down("md")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "2rem",
      },
    },
    h3: {
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: "1.8rem",
      color: "#48b3f7",
      lineHeight: 1.5,
      [theme.breakpoints.down("md")]: {
        fontSize: "1.5rem",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.2rem",
      },
    },
  },
  themeStyle: {
    typography: {
      useNextVariants: true,
      tab: {
        fontFamily: "Montserrat",
        textTransform: "none",
        fontWeight: 600,
        fontSize: ".9rem",
      },
    },
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto 20px auto",
      width: 100,
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    button: {
      fontFamily: "Montserrat",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
    invisibleSeperator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
  },
  paper: {
    padding: 20,
  },
  profile: {
    textAlign: "left",
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
  },
  button: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  profileImage: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
  imageWrapper: {
    textAlign: "center",
    position: "relative",
    "& button": {
      position: "absolute",
      top: "80%",
      left: "70%",
    },
  },
  profileDetails: {
    textAlign: "center",
    "& span, svg": {
      verticalAlign: "middle",
    },
    "& a": {
      color: "#00bcd4",
      verticalAlign: "middle",
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});
