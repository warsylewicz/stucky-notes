import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-tiger-transition";
import Copyright from "./Copyright";
const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignInForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [validLogin, setValidLogin] = useState(null);

  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/auth/signin",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.accessToken !== null) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("email", response.data.email);
        setValidLogin(response.data.role);
      } else {
        throw new Error('Invalid Login');
      }
    } catch (e) {
      console.log(e);
      setInvalidLogin(true);
    }
  }

  const handleClose = (event, reason) => {
    setInvalidLogin(false);
  };

  if (validLogin === "admin") {
    return (
      <Redirect to="/admin" />
    );
  }
  if (validLogin === "user") {
    return (
      <Redirect to="/notes" />
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Link to="/signup" variant="body2" transition="pushPull-left">
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </div>
      <Snackbar open={invalidLogin} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Invalid login.  Please try again or create an account.
        </Alert>
      </Snackbar>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
