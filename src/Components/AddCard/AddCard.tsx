import {Card, CardActionArea, Grid} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

function AddCard(props: { onClick?: () => void, disabled?: boolean }) {
  return <Card
    variant="outlined"
    onClick={props.onClick}
    sx={{height: '100%',}}
  >
    <CardActionArea sx={{height: '100%', width: '100%'}} disabled={props.disabled}>
      <Grid container direction="column" alignItems="center" justifyContent="center" p={2}>
        <Grid item>
          <AddIcon fontSize="large" color="primary"/>
        </Grid>
      </Grid>
    </CardActionArea>
  </Card>;
}

export default AddCard;