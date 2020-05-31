import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        light: "#ffffe5",
        main: "#ffecb3",
        dark: "#cbba83",
        contrastText: "#000",
      },
      secondary: {
        light: "#edffff",
        main: "#baddf9",
        dark: "#89abc6",
        contrastText: "#000",
      },
    },
  },
  "Paper Theme"
);

export default theme;
