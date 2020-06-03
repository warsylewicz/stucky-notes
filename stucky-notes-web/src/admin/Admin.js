import React, { useState, useEffect } from "react";
import { Button, Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import UserCard from "./UserCard";
const axios = require("axios").default;

(function () {
  const token = localStorage.getItem("token");
  if (token) axios.defaults.headers.common["x-access-token"] = token;
  else axios.defaults.headers.common["x-access-token"] = null;
})();

export default function Admin(props) {
  const [users, setUsers] = useState([]);
  const [startDeleteUser, setStartDeleteUser] = useState(false);

  const signOut = function () {
    props.handleSignOut();
  };

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        let response = await axios(
          process.env.REACT_APP_API_URL + "/api/users"
        );
        if (response.status !== 200) {
          throw new Error("Cannot get users");
        }
        if (!ignore) setUsers(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  async function deleteUser(email) {
    try {
      let response = await axios.delete(
        process.env.REACT_APP_API_URL + "/api/users/" + email
      );
      if (response.status === 200) {
        // remove from state
        setUsers(users.filter((u) => u.email !== email));
      } else {
        throw new Error(`Unable to delete: ${email}`);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleUndoDelete(email) {
    setUsers(
      users.map((u) => {
        if (u.email === email) delete u.toBeDeleted;
        return u;
      })
    );
  }

  function handleDelete(email) {
    // if there is already an email stored, permanently delete them
    finishDelete();

    // turn on undo notification
    setUsers(
      users.map((u) => {
        if (u.email === email) u.toBeDeleted = true;
        return u;
      })
    );
    setStartDeleteUser(true);
  }

  function finishDelete() {
    setStartDeleteUser(false);
    const prev = users.filter((u) => u.toBeDeleted)[0];
    if (prev) {
      deleteUser(prev.email);
    }
  }

  const userCards = users
    .filter((u) => !u.toBeDeleted)
    .sort((u1, u2) => new Date(u1.lastLogin) - new Date(u2.lastLogin))
    .map((user) => (
      <Grid item xs={12} md={6}>
        <UserCard user={user} key={user.email} handleDelete={handleDelete} />
      </Grid>
    ));

  return (
    <>
      <h2>Users</h2>
      <Button onClick={signOut}>Sign Out</Button>
      <Grid container spacing={3}>
        {userCards}
      </Grid>
      <Snackbar
        open={startDeleteUser}
        autoHideDuration={6000}
        onClose={finishDelete}
      >
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small" onClick={handleUndoDelete}>
              UNDO
            </Button>
          }
        >
          Account deleted.
        </Alert>
      </Snackbar>
    </>
  );
}
