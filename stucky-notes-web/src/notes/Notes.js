import React from "react";
import { Link } from "react-tiger-transition";
import Paper from "@material-ui/core/Paper";

const axios = require("axios").default;

(function () {
  const token = localStorage.getItem("token");
  if (token) axios.defaults.headers.common["x-access-token"] = token;
  else axios.defaults.headers.common["x-access-token"] = null;
})();

function Notes(props) {
  // const classes = useStyles();

  return (
    <Paper elevation={4}>
      Notes page
      <Link to="/" transition="scale">Login</Link>
    </Paper>
  );
}

export default Notes;
