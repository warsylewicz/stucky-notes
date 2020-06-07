import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogActions,
  Toolbar,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Note from './Note'
const axios = require('axios').default

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

(function () {
  const token = localStorage.getItem('token')
  if (token) axios.defaults.headers.common['x-access-token'] = token
  else axios.defaults.headers.common['x-access-token'] = null
})()

export default function Notes (props) {
  const [notes, setNotes] = useState([])
  const [noteToDelete, setNoteToDelete] = useState('')
  const classes = useStyles()

  const signOut = function () {
    props.handleSignOut()
  }

  useEffect(() => {
    let ignore = false

    async function fetchData () {
      try {
        const response = await axios(
          process.env.REACT_APP_API_URL + '/api/notes'
        )
        if (response.status !== 200) {
          throw new Error('Cannot get notes')
        }
        if (!ignore) setNotes(response.data)
        console.log(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [])

  // async function doDelete() {
  //   try {
  //     let response = await axios.delete(
  //       process.env.REACT_APP_API_URL + "/api/users/" + accountToDelete
  //     );
  //     if (response.status === 200) {
  //       setUsers((prev) => prev.filter((u) => u.email !== accountToDelete));
  //       setAccountToDelete("");
  //     } else {
  //       throw new Error(`Unable to delete: ${accountToDelete}`);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     setAccountToDelete(""); // TODO display an error message
  //   }
  // }

  const noteComponents = notes.map((n) => <Note key={n.id} details={n} />)

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Your Notes
          </Typography>
          <Button color='inherit' onClick={signOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>
      <Container>
        {noteComponents}
      </Container>
    </>
  )
}
