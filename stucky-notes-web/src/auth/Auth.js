import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
  },
});

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
      signUp: false,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="sm">
        <Slide
          direction="right"
          in={this.state.signIn}
          onExited={() => this.setState({ signUp: true })}
          mountOnEnter
          unmountOnExit
        >
          <Paper elevation={4} className={classes.paper}>
            <SignInForm doSwitch={() => this.setState({ signIn: false })} />
          </Paper>
        </Slide>
        <Slide
          direction="left"
          in={this.state.signUp}
          onExited={() => this.setState({ signIn: true })}
          mountOnEnter
          unmountOnExit
        >
          <Paper elevation={4} className={classes.paper}>
            <SignUpForm doSwitch={() => this.setState({ signUp: false })} />
          </Paper>
        </Slide>
      </Container>
    );
  }
}

export default withStyles(styles)(Auth);
