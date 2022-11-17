import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#303f9f",
      light: "#5965b2",
      dark: "#212c6f",
    },
    secondary: {
      main: "#ff4081",
      light: "#FF669A",
      dark: "#B22C5A",
    },
    buttonColor: {
      main: "#7879F1",
    },
    neutral: {
      main: "#212121",
    },
  },
  typography: {
    h3: {
      fontWeight: 400,
    },
    h4: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 500,
    },
    newVariant: {
      fontWeight: 400,
      fontSize: "1rem",
      color: "#757575",
    },
    myVariant: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    body2: {
      fontWeight: 400,
      fontSize: "16px",
      color: "#000000",
    },
  },
});

export default theme;
