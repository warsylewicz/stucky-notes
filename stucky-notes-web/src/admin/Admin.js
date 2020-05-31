import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const axios = require("axios").default;

(function () {
  const token = localStorage.getItem("token");
  if (token) axios.defaults.headers.common["x-access-token"] = token;
  else axios.defaults.headers.common["x-access-token"] = null;
})();

function logout() {
    localStorage.setItem("token", null);
}

export default function Admin(props) {
    


  return (
    <Paper elevation={4}>
      Admin page
      <Button onClick={logout}>Logout</Button>
    </Paper>
  );
}
