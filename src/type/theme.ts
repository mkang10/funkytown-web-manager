// theme.ts
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f4f4f4",
      paper: "#fff",
    },
    text: {
      primary: "#000",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f0f0f",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#fff",
    },
  },
});
