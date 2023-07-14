import {GridOverlay} from "@mui/x-data-grid";
import React from "react";
import NoContentIcon from "../NoContentIcon/NoContentIcon";
import {Stack} from "@mui/material";

function NoRowsOverlay() {
  return (
    <GridOverlay>
      <Stack>
        <NoContentIcon caption="No elements"/>
      </Stack>
    </GridOverlay>
  );
}

export default NoRowsOverlay;
