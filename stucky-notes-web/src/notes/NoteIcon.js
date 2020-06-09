import React from 'react'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import Draggable from 'react-draggable'
import { makeStyles } from '@material-ui/core/styles'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'

const useStyles = makeStyles(theme => ({
  card: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    fontSize: '1em',
    margin: '0',
    padding: '0',
    fontFamily: 'papyrus',
    cursor: 'default',
    backgroundColor: theme.palette.secondary.light,
    transform: 'rotate(10deg)'
  }
}))

export default function NoteIcon (props) {
  const classes = useStyles()

  function handleDragStop (e, position) {
    props.onUpdatePosition(props.details.id, position.x, position.y)
  }

  function handleClick () {
    const card = document.getElementById('id' + props.details.id)
    let zindex = card.style.zIndex || 1
    card.style.zIndex = zindex + 1
    props.onClick()
  }

  return (
    <Draggable
      defaultPosition={{ x: props.details.posx, y: props.details.posy }}
      handle='strong'
      bounds='parent'
      onStop={handleDragStop}
    >
      <Card
        id={'id' + props.details.id}
        className={classes.card}
        style={{
          transform: 'rotate(10deg)' // +
          //((props.details.contents.charCodeAt(0) % 15) - 8) +
          //'deg)',
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
          {props.details.contents.length > 45
            ? props.details.contents.substr(0, 40) + '...'
            : props.details.contents}
        </CardContent>
      </Card>
    </Draggable>
  )
}
