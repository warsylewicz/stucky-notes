import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
  root: {

  },
  avatar: {
    backgroundColor: theme.palette.primary.dark
  }
}))

export default function UserCard (props) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {props.user.email.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings' onClick={() => props.handleDelete(props.user.email)}>
            <DeleteIcon />
          </IconButton>
        }
        title={props.user.email}
        subheader={'Last signed in: ' + props.user.lastLogin}
      />
    </Card>
  )
}
