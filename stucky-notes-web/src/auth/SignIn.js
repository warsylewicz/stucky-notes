import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Container, Paper, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import SignInForm from "./SignInForm";
const axios = require("axios").default;

(function () {
  const token = localStorage.getItem("token");
  if (token) axios.defaults.headers.common["x-access-token"] = token;
  else axios.defaults.headers.common["x-access-token"] = null;
})();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
}));

export default function SignIn(props) {
  const [user, setUser] = useState({});

  const classes = useStyles();

  // useEffect(() => {
  //   async function isLoggedIn() {
  //     let response = await axios.get(
  //       process.env.REACT_APP_API_URL + "/api/auth/user"
  //     );
  //     if (response.data.email != null) {
  //       setUser({ email: response.data.email, role: response.data.role });
  //     } else {
  //       setUser({});
  //     }
  //   }

  //   isLoggedIn();
  // });

  return (
    <Container maxWidth="sm">
      <Title />
      <Paper elevation={4} className={classes.paper} theme={props.theme}>
        <SignInForm  />
      </Paper>
    </Container>
  );
}
