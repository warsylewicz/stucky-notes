import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    marginTop: theme.spacing(4),
    width: '50px',
    height: '50px',
    fontSize: 'calc(12px)',
    margin: '0',
    padding: '0',
    fontFamily: 'papyrus',
    cursor: 'move',
    backgroundColor: theme.palette.secondary.light
  }
}))

export default function Note (props) {
  const classes = useStyles()

  return (
    <DndProvider backend={HTML5Backend}>

      <Paper
        elevation={3}
        square
        className={classes.paper}
        style={{
          transform:
          'rotate(' + (props.details.contents.charCodeAt(0) % 15 - 8) + 'deg)',
          // "rotate(5deg)",
          top: props.details.posy + 'px',
          left: (props.details.posx + 800) + 'px'
        }}
      >
        {props.details.contents.substr(0, 20)}
      </Paper>
    </DndProvider>
  )
}
