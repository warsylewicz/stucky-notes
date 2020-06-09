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
    height: '100vh',
    fontSize: 'calc(12px)',
    margin: '0',
    padding: '0',
    fontFamily: 'papyrus',
    backgroundColor: theme.palette.secondary.light
  }
}))

export default function Note (props) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        style={{ height: '0' }}
        action={<CloseIcon onClick={props.onClose} />}
      />
      <CardContent>
        <TextField
          id='standard-multiline-static'
          label='Multiline'
          multiline
          rows={4}
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
