import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#4153AF",
    },
    secondary: {
      main: "#ff4081",
      light: "#FF669A",
      dark: "#B22C5A",
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
      fontSize: "0.9rem",
      color: "#757575",
    },
    myVariant: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    body2: {
      fontWeight: 400,
      fontSize: "16px",
      color: "#000000",
    },
  },
});

export default theme;
