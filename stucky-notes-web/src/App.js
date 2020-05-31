import React from "react";
import "./App.css";
import Auth from "./auth/Auth";
import Notes from "./notes/Notes";
import Admin from "./admin/Admin";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
        <BrowserRouter>
          <AnimatePresence>
            <Switch location={window.location} key={window.location.pathname}>
              <Route path="/notes" component={Notes} />
              <Route path="/admin" component={Admin} />
              <Route path="/" component={Auth} />
            </Switch>
          </AnimatePresence>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}
