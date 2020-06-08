import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Button,
  Container,
  Fab,
  Toolbar,
  Typography
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import NoteIcon from './NoteIcon'
const axios = require('axios').default

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  container: {
    width: '100vw',
    height: '90vh'
  }
}))

;(function () {
  const token = window.localStorage.getItem('token')
  if (token) axios.defaults.headers.common['x-access-token'] = token
  else axios.defaults.headers.common['x-access-token'] = null
})()

export default function Notes (props) {
  const [notes, setNotes] = useState([])
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
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [])

  const noteComponents = notes.map(n => (
    <NoteIcon key={n.id} details={n} onUpdatePosition={updatePosition} />
  ))

  async function addNote () {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/notes',
        {
          contents: 'New note created ' + new Date(),
          posx: Math.floor(Math.random() * 100),
          posy: Math.floor(Math.random() * 100)
        }
      )
      let newNote = response.data
      setNotes([...notes, newNote])
    } catch (err) {
      console.log(err)
    }
  }

  async function updatePosition (id, x, y) {
    let notesCopy = notes.map(n => {
      if (n.id === id) {
        n.posx = x
        n.posy = y
        return n
      } else {
        return n
      }
    })
    const updatedNote = notesCopy.filter(n => n.id === id)[0]
    console.log(updatedNote)
    if (!updatedNote) {
      console.log("Couldn't find note with id " + id)
      return
    }

    setNotes(notesCopy)
    try {
      const response = await axios.patch(
        process.env.REACT_APP_API_URL + '/api/notes/' + id,
        {
          contents: updatedNote.contents,
          posx: updatedNote.posx,
          posy: updatedNote.posy
        }
      )
      if (response.status !== 200) throw new Error(response.status)
    } catch (err) {
      console.log("Couldn't update note with id " + id + '. ' + err)
    }
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Your Notes
          </Typography>
          <Button color='inherit' onClick={signOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Fab color='primary' aria-label='add' onClick={addNote}>
        <AddIcon />
      </Fab>
      <Container className={classes.container}>{noteComponents}</Container>
    </>
  )
}
