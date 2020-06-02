import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const axios = require("axios").default;

(function () {
  const token = localStorage.getItem("token");
  if (token) axios.defaults.headers.common["x-access-token"] = token;
  else axios.defaults.headers.common["x-access-token"] = null;
})();

function Notes(props) {
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
      Notes page
      <Button onClick={signOut}>Sign Out</Button>
    </Paper>
  );
}

export default Notes;
