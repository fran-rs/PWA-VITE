import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      main: "#7C4DFF",
    },
    secondary: {
      main: "#00E5FF",
    },
    background: {
      default: "#F9FAFB",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: `"Inter", "Roboto", sans-serif`,
  },
});
