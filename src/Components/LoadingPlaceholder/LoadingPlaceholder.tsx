import {CircularProgress, Grid} from "@mui/material";
import React from "react";

const LoadingPlaceholder = () => {
  return <Grid container alignItems="center" justifyContent="center" sx={{width: '100%', height: '8vh'}}>
    <Grid item>
      <CircularProgress/>
    </Grid>
  </Grid>
}
export default LoadingPlaceholder;