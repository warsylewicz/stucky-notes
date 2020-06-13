import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(4),
    width: '100%',
    height: '100%',
    fontSize: '12px',
    backgroundColor: theme.palette.secondary.light
  }
}))

export default function Note (props) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        style={{ height: '0' }}
        action={
          <IconButton
            color='primary'
            aria-label='close note'
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        <TextField
          id='standard-multiline-static'
          label='Note'
          style={{fontFamily: 'papyrus'}}
          multiline
          value={props.details.contents}
          onChange={e => props.onChange(e.target.value)}
        />
      </CardContent>
      <IconButton
        color='primary'
        aria-label='delete note'
        onClick={props.onDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  )
}
