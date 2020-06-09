import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Link } from 'react-tiger-transition'
import { Redirect } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import Copyright from './Copyright'
const axios = require('axios').default

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

function SignUpForm (props) {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validSignUp, setValidSignUp] = useState(0)
  const [invalidSignUp, setInvalidSignUp] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/auth/signup',
        {
          email: email,
          password: password
        }
      )
      console.log(response)
      if (response.data.accessToken !== null) {
        window.localStorage.setItem('token', response.data.accessToken)
        window.localStorage.setItem('email', response.data.email)
        window.localStorage.setItem('role', response.data.role)
        setValidSignUp(1)
      } else {
        throw new Error('Invalid Login')
      }
    } catch (e) {
      console.log(e)
      setInvalidSignUp(true)
    }
  }

  const handleClose = (event, reason) => {
    setInvalidSignUp(false)
  }

  const handleCloseValidSignUp = (event, reason) => {
    setValidSignUp(2)
  }

  if (validSignUp === 2) {
    return (
      <Redirect to='/notes' />
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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                type='email'
                value={email}
                autoComplete='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={password}
                autoComplete='current-password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Link to='/' variant='body2' transition='pushPull-right'>
            {'Already have an account? Sign in'}
          </Link>
        </form>
      </div>
      <Snackbar open={invalidSignUp} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='warning'>
          Email already exists.  Please try again with a different email.
        </Alert>
      </Snackbar>
      <Snackbar open={validSignUp === 1} autoHideDuration={1000} onClose={handleCloseValidSignUp}>
        <Alert onClose={handleCloseValidSignUp} severity='success'>
          Successfully created your account.  Signing you in...
        </Alert>
      </Snackbar>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default SignUpForm
