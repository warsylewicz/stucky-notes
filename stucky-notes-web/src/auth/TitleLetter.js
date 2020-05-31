import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    width: "calc(15px + 75%)",
    height: "calc(15px + 75%)",
    fontSize: "calc(30px + 30%)",
    margin: "0",
    paddingTop: "20%",
    paddingBottom: "0%",
    fontFamily: "papyrus",
    cursor: "default",
    backgroundColor: theme.palette.secondary.light,
  },
}));

function TitleLetter(props) {
  const classes = useStyles();
  return (
    <Paper
      elevation={3}
      square={true}
      className={classes.paper}
      style={{
        transform:
          "rotate(" + ((props.contents.charCodeAt(0) % 25) - 12) + "deg)",
      }}
    >
      {props.contents}
    </Paper>
  );
}

export default TitleLetter;
