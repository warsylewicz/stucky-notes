import React from 'react';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        width: "100%",
        height: "80%",
        fontSize: "300%",
        paddingTop: "20%",
        fontFamily: "papyrus",
        cursor: "default",
        backgroundColor: theme.palette.secondary.light,
    },
}));

function Note(props) {
    const classes = useStyles();
    return (
            <Paper
                elevation={3}
                square={true}
                className={classes.paper}
                style={{transform: "rotate(" + (props.color - 3) * 4 + "deg)"}}
                >
                {props.contents}
            </Paper>
    );
}

export default Note;
