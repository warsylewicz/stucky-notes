import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";

import Title from "./Title";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Redirect } from "react-router";
const axios = require("axios").default;

(function() {
  const token = localStorage.getItem("token");
  if (token)
      axios.defaults.headers.common['x-access-token'] = token;
  else
      axios.defaults.headers.common['x-access-token'] = null;
})();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
}));

function Auth(props) {
  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [user, setUser] = useState({});

  const classes = useStyles();

  useEffect( () => {
    async function isLoggedIn() {
      let response = await axios.get(process.env.REACT_APP_API_URL + "/api/auth/user");
      if (response.data.email != null) {
        setUser( { email: response.data.email, role: response.data.role });
      } else {
        setUser( {} );
      }
    }

    isLoggedIn();
  });

  if (user.role === "admin") {
    return (
      <Redirect to="/admin" />
    );
  }

  return (
    <Container maxWidth="sm">
      <Title />
      <Slide
        direction="right"
        in={signIn}
        onExited={() => setSignUp(true)}
        mountOnEnter
        unmountOnExit
      >
        <Paper elevation={4} className={classes.paper} theme={props.theme}>
          <SignInForm doSwitch={() => setSignIn(false)} />
        </Paper>
      </Slide>
      <Slide
        direction="left"
        in={signUp}
        onExited={() => setSignIn(true)}
        mountOnEnter
        unmountOnExit
      >
        <Paper elevation={4} className={classes.paper}>
          <SignUpForm doSwitch={() => setSignUp(false)} />
        </Paper>
      </Slide>
    </Container>
  );
}

export default Auth;
