import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";

import Title from "./Title";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  }
}));

function Auth() {
  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Title />
      <Slide
        style={{transform: "rotate(40deg)"}}
        direction="right"
        in={signIn}
        onExited={() => setSignUp(true)}
        mountOnEnter
        unmountOnExit
      >
        <Paper elevation={4} className={classes.paper} >
          <SignInForm doSwitch={() => setSignIn(false) } />
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
