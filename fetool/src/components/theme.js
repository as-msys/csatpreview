import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#3F51B5",
    },
    secondary: {
      main: "#ff4081",
    },
    neutral: {
      main: "#212121",
    },
    disabled: {
      main: "rgba(0,0,0,0.26)",
    },
  },

  typography: {
    h3: {
      fontWeight: 400,
    },
    h4: {
      fontWeight: 400,
      fontSize: "34px",
    },
    surveyVariant: {
      fontWeight: 700,
      fontSize: "20px",
      marginTop: "2rem",
      marginLeft: "1.5rem",
    },
    templateVariant: {
      fontWeight: 700,
      fontSize: "17px",
      marginTop: "1rem",
      marginLeft: "1rem",
    },
    subtitle1: {
      fontSize: "15px",
      fontWeight: 400,
      color: "rgba(0,0,0,0.6)",
    },
    subtitle2: {
      fontSize: "15px",
      fontWeight: 400,
      lineHeight: "20.02px",
      color: "rgba(0,0,0,0.6)",
      marginBottom: "1rem",
    },
    countVariant: {
      fontWeight: 400,
      fontSize: "0.9rem",
      color: "#757575",
    },
    titleVariant: {
      fontWeight: 400,
      fontSize: "2.5rem",
      marginLeft: "1.5rem",
      marginTop: "1rem",
    },
    body2: {
      fontWeight: 500,
      fontSize: "16px",
      color: "#000000",
    },
  },
});

export default theme;
