import {GridOverlay} from "@mui/x-data-grid";
import React from "react";
import EmptyGridContent from "../NoContentIcon/EmptyGridContent";
import {Stack} from "@mui/material";

function NoRowsOverlay() {
  return (
    <GridOverlay>
      <Stack>
        <EmptyGridContent caption="No elements"/>
      </Stack>
    </GridOverlay>
  );
}

export default NoRowsOverlay;
