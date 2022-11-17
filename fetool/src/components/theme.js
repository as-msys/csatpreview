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
    myVariant: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
  },
});

export default theme;
