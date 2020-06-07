import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-tiger-transition'
import Copyright from './Copyright'
const axios = require('axios').default

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignInForm (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [invalidSignIn, setInvalidSignIn] = useState(false)
  const [validSignIn, setValidSignIn] = useState(window.localStorage.getItem('role'))

  const classes = useStyles()

  async function handleSubmit (e) {
    e.preventDefault()
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/auth/signin',
        {
          email: email,
          password: password
        }
      )
      if (response.data.accessToken !== null) {
        window.localStorage.setItem('token', response.data.accessToken)
        window.localStorage.setItem('email', response.data.email)
        window.localStorage.setItem('role', response.data.role)
        props.onSignIn(response.data.role)
        setValidSignIn(response.data.role)
      } else {
        throw new Error('Invalid Sign In')
      }
    } catch (e) {
      console.log(e)
      setInvalidSignIn(true)
    }
  }

  const handleClose = (event, reason) => {
    setInvalidSignIn(false)
  }

  if (validSignIn === 'user') {
    return (
      <Redirect to='/notes' />
    )
  }

  if (validSignIn === 'admin') {
    return (
      <Redirect to='/admin' />
    )
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            type='email'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>

          <Link to='/signup' variant='body2' transition='pushPull-left'>
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </div>
      <Snackbar open={invalidSignIn} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='warning'>
          Invalid email or password.  Please try again or create an account.
        </Alert>
      </Snackbar>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
