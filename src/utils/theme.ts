import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8e24aa",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    body1: {
      fontWeight: 700,
    },
    body2: {
      fontSize: 14,
      fontWeight: 600,
    },
  },
});
