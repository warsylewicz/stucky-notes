import React from "react";
import { Redirect } from "react-router";
import { Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import SignInForm from "./SignInForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const token = localStorage.getItem("token");
  if (token !== null)
    return <Redirect to="/notes" />;

  return (
    <Container maxWidth="sm">
      <Title />
      <Paper elevation={4} className={classes.paper} theme={props.theme}>
        <SignInForm />
      </Paper>
    </Container>
  );
}
