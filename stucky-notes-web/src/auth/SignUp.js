import React from "react";
import { Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import SignUpForm from "./SignUpForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Title />
      <Paper elevation={4} className={classes.paper}>
        <SignUpForm handleSignIn={props.handleSignIn} />
      </Paper>
    </Container>
  );
}
