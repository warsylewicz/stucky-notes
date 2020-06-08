import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Dialog,
  Typography
} from '@material-ui/core'
import Draggable from 'react-draggable'
import { makeStyles } from '@material-ui/core/styles'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'

const useStyles = makeStyles(theme => ({
  card: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    fontSize: 'calc(12px)',
    margin: '0',
    padding: '0',
    fontFamily: 'papyrus',
    cursor: 'default',
    backgroundColor: theme.palette.secondary.light
  }
}))

export default function NoteIcon (props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  function handleDragStop (e, position) {
    console.log(position)
    props.onUpdatePosition(props.details.id, position.x, position.y)
  }

  function handleClick (e) {
    setOpen(true)
  }

  function handleClose () {
    props.onUpdatePosition(props.details.id)
    setOpen(false)
  }

  return (
    <>
      <Draggable
        defaultPosition={{ x: props.details.posx, y: props.details.posy }}
        handle='strong'
        bounds='parent'
        onStop={handleDragStop}
      >
        <Card
          className={classes.card}
          style={{
            transform: 'rotate(10deg)' // +
            //((props.details.contents.charCodeAt(0) % 15) - 8) +
            //'deg)',
            //top: props.details.posy + 'px',
            //left: props.details.posx + 'px'
          }}
        >
          <CardHeader
            style={{ height: '0' }}
            action={
              <strong>
                <DragIndicatorIcon style={{ cursor: 'move' }} />
              </strong>
            }
          />
          <CardContent style={{ cursor: 'pointer' }} onClick={handleClick}>
            {props.details.contents.substr(0, 50)}...
          </CardContent>
        </Card>
        {/* <Paper
          elevation={3}
          square
          className={classes.paper}
          style={{
            transform:
              'rotate(' +
              ((props.details.contents.charCodeAt(0) % 15) - 8) +
              'deg)',
            top: props.details.posy + 'px',
            left: props.details.posx + 800 + 'px'
          }}
          onClick={handleClick}
        >
          {props.details.contents.substr(0, 20)}
          <strong><DragIndicator /></strong>
        </Paper> */}
      </Draggable>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        This is a dialog
      </Dialog>
    </>
  )
}
