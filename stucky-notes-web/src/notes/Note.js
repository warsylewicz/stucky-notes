import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrop } from 'react-dnd'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    width: "calc(15px + 5%)",
    height: "calc(15px + 5%)",
    fontSize: "calc(12px + 10%)",
    margin: "0",
    paddingTop: "20%",
    paddingBottom: "0%",
    fontFamily: "papyrus",
    cursor: "default",
    backgroundColor: theme.palette.secondary.light,
  },
}));

export default function Note(props) {
  const classes = useStyles();
  return (
    <DndProvider backend={HTML5Backend}>

    <Paper
      elevation={3}
      square={true}
      className={classes.paper}
      style={{
        transform:
          "rotate(5deg)",
      }}
    >
      This is a note!
    </Paper>
    </DndProvider>
  );
}
