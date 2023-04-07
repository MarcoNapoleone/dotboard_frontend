import {CardContent, Grid, Skeleton, Typography, useMediaQuery} from "@mui/material";
import React from "react";
import {useTheme} from "@mui/material/styles";

function DetailsLoading(props: { rows?: number, columns?: number }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let usedRows = isMobile ? 2 : 3;
  let usedColumns = 2;

  if (props.rows) usedRows = props.rows;
  if (props.columns) usedColumns = props.columns;

  return <CardContent>
    <Grid container direction="column" spacing={1} py={2}>
      {[...Array(usedRows)].map((row, rowKey) => (
          <Grid item key={rowKey} container spacing={1} pt={1}>
            {[...Array(usedColumns)].map((column,columnKey) => (
              <Grid item  key={columnKey} xs={12} sm={6}>
                <Typography variant="h6" color="text.secondary">
                  <Skeleton animation="wave" width="180px"/>
                </Typography>
                <Typography variant="h6">
                  <Skeleton animation="wave" width="200px"/>
                </Typography>
              </Grid>
            ))}
          </Grid>
        )
      )}
    </Grid>
  </CardContent>;
}

export default DetailsLoading;