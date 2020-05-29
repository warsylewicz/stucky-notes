import React from "react";
import "./App.css";
import Auth from "./auth/Auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Auth />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
