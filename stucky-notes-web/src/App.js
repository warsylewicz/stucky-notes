import React, { useState } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Navigation, Route, pushPull, scale } from "react-tiger-transition";
import "react-tiger-transition/styles/main.min.css";
import "./App.css";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Notes from "./notes/Notes";
import Admin from "./admin/Admin";

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
// inject glide styles
pushPull({
  name: "pushPull-left",
});
pushPull({
  name: "pushPull-right",
  direction: "right",
});
scale({
  name: "scale",
});

export default function App(props) {
  const [role, setRole] = useState(localStorage.getItem("role"));

  function handleSignIn(newRole) {
    setRole(newRole);
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setRole("");
  }

  return (
    <Navigation
      globalTransitionProps={{
        ...props,
        timeout: 600,
        classNames: "scale",
      }}
    >
      <Route exact screen path="/notes" skip={role !== "user"}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Notes handleSignOut={handleSignOut} />
          </div>
        </MuiThemeProvider>
      </Route>
      <Route exact screen path="/admin" skip={role !== "admin"}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Admin handleSignOut={handleSignOut} />
          </div>
        </MuiThemeProvider>
      </Route>
      <Route exact screen path="/signup">
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <SignUp handleSignIn={handleSignIn} />
          </div>
        </MuiThemeProvider>
      </Route>
      <Route exact screen path="/">
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <SignIn handleSignIn={handleSignIn} />
          </div>
        </MuiThemeProvider>
      </Route>
    </Navigation>
  );
}
