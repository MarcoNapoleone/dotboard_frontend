import {Box, Typography} from "@mui/material";
import React from "react";

function DialogFormLabel(props: { title: string }) {
  return <Box pt={2}>
    <Typography component="span" variant="caption" color="text.secondary">
      {props.title}
    </Typography>
  </Box>;
}

export default DialogFormLabel;