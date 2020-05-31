import React from "react";
import TitleLetter from "./TitleLetter";
import Grid from "@material-ui/core/Grid";

function Title() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <TitleLetter contents="S" />
      </Grid>
      <Grid item xs={2}>
        <TitleLetter contents="t" />
      </Grid>
      <Grid item xs={2}>
        <TitleLetter contents="u" />
      </Grid>
      <Grid item xs={2}>
        <TitleLetter contents="c" />
      </Grid>
      <Grid item xs={2}>
        <TitleLetter contents="k" />
      </Grid>
      <Grid item xs={2}>
        <TitleLetter contents="y" />
      </Grid>

      <Grid item xs={1}></Grid>
      <Grid item xs={2}>
        <TitleLetter contents="N" />
      </Grid>
      <Grid item xs={2}>
        <TitleLetter contents="o" />
      </Grid>
      <Grid item xs={2}>
        <TitleLetter contents="t" />
      </Grid>
      <Grid item xs={2}>
        <TitleLetter contents="e" />
      </Grid>
      <Grid item xs={2}>
        <TitleLetter contents="s" />
      </Grid>
    </Grid>
  );
}

export default Title;
