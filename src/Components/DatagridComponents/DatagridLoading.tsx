import {useTheme} from "@mui/material/styles";
import {GridOverlay} from "@mui/x-data-grid";
import {LinearProgress} from "@mui/material";
import React from "react";

function LoadingOverlay() {
  const theme = useTheme();
  return (
    <GridOverlay>
      <div style={{zIndex: 1, position: 'absolute', top: 0, width: '100%'}}>
        <LinearProgress/>
      </div>
    </GridOverlay>
  );
}

export default LoadingOverlay;