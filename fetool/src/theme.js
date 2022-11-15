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
  },
  typography: {
    h2: {
      fontWeight: 700,
    },
  },
});

export default theme;
