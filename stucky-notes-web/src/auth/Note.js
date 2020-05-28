import React from 'react';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        width: "100%",
        height: "90%",
        fontSize: "300%",
        paddingTop: "20%",
        fontFamily: "papyrus",
        cursor: "default",
    },
    noteColor1: { backgroundColor: "#E1CEC9", },
    noteColor2: { backgroundColor: "#EBE6E5", },
    noteColor3: { backgroundColor: "#DFD8DC", },
    noteColor4: { backgroundColor: "#D2C1CE", },
    noteColor5: { backgroundColor: "#B4BAD4", },
    noteColor6: { backgroundColor: "#D4CFBD", },
}));

function Note(props) {
    const classes = useStyles();
    return (
            <Paper
                elevation={3}
                square={true}
                className={[classes.paper, classes["noteColor" + props.color] ]}
                style={{transform: "rotate(" + (props.color - 3) * 4 + "deg)"}}
                >
                {props.contents}
            </Paper>
    );
}

export default Note;
