import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const axios = require("axios").default;

(function () {
  const token = localStorage.getItem("token");
  if (token) axios.defaults.headers.common["x-access-token"] = token;
  else axios.defaults.headers.common["x-access-token"] = null;
})();

export default function Admin(props) {
    const[signedOut, setSignedOut] = useState(false);

    const signOut = function() {
      localStorage.removeItem("token");
      setSignedOut(true);
    }

    if (signedOut) {
      return <Redirect to="/" />
    }

  return (
    <Paper elevation={4}>
      Admin page
      <Button onClick={signOut}>Sign Out</Button>
    </Paper>
  );
}
