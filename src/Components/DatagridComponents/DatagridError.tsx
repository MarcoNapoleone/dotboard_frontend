import React, {useContext} from "react";
import {GridOverlay, GridOverlayProps} from "@mui/x-data-grid";
import {Container, Grid, IconButton, Typography} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import {useAlertContext} from "../Providers/Alert/Alert.provider";

function ErrorOverlay(props: GridOverlayProps & { allowAdd: boolean }) {

  const {alertEvent, setAlertEvent} = useContext(useAlertContext);
  return (
    <GridOverlay>
      <Container>
        <Grid container direction="column" justifyContent="center" alignContent="center">
          <Grid item>
            <Typography align="center">
              <IconButton color="error" size="small">
                <CancelIcon fontSize="large"/>
              </IconButton>
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center" variant="h4">
              Error
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center" color="text.secondary">
              <code>{alertEvent.message}</code>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </GridOverlay>
  );
}

export default ErrorOverlay;
