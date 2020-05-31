import React from "react";
import "./App.css";
import Auth from "./auth/Auth";
import { Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const axios = require("axios").default;

(function() {
  const token = localStorage.getItem("token");
  if (token)
      axios.defaults.headers.common['x-access-token'] = token;
  else
      axios.defaults.headers.common['x-access-token'] = null;
})();

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        light: "#6197f5",
        main: "#1d6ac2",
        dark: "#004091",
        contrastText: "#ffffff",
      },
      secondary: {
        light: "#ffffc9",
        main: "#f2d298",
        dark: "#bea169",
        contrastText: "#000",
      },
    },
  },
  "Paper Theme"
);

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Auth />
      </div>
    </MuiThemeProvider>
  );
}
