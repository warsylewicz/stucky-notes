import React from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    width: '80%',
    height: '80%',
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
    <Paper
      elevation={3}
      square
      className={classes.paper}
      style={{
        transform:
          'rotate(' + ((props.details.contents.charCodeAt(0) % 15) - 8) + 'deg)'
      }}
    >
      {props.details.contents}
    </Paper>
  )
}
