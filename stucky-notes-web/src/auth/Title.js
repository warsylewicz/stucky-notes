import React from "react";
import Note from "./Note";
import Grid from "@material-ui/core/Grid";

function Title() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={2}><Note contents="S" color={1} /></Grid>
      <Grid item xs={2}><Note contents="t" color={2} /></Grid>
      <Grid item xs={2}><Note contents="u" color={3} /></Grid>
      <Grid item xs={2}><Note contents="c" color={4} /></Grid>
      <Grid item xs={2}><Note contents="k" color={5} /></Grid>
      <Grid item xs={2}><Note contents="y" color={6} /></Grid>
    
      <Grid item xs={1}></Grid>
      <Grid item xs={2}><Note contents="N" color={3} /></Grid>
      <Grid item xs={2}><Note contents="o" color={1} /></Grid>
      <Grid item xs={2}><Note contents="t" color={6} /></Grid>
      <Grid item xs={2}><Note contents="e" color={4} /></Grid>
      <Grid item xs={2}><Note contents="s" color={2} /></Grid>
    </Grid>
  );
}

export default Title;
