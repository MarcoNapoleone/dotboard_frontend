import {DataGrid, GridRowsProp} from "@mui/x-data-grid";
import React from "react";
import {Card} from "@mui/material";

function DatagridTable(
  props: {
    rows?: GridRowsProp,
    columns?: any,
    loading: boolean,
    allowAdd?: boolean,
    onAdd?: () => void,
    onRowDoubleClick?: (e: any) => void,
  }
) {
  return (
    <Card variant="outlined" style={{height: "auto", width: "100%"}}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        getRowId={(row) => row.id}
        disableColumnMenu
        autoHeight
        loading={props.loading}
        onRowDoubleClick={props.onRowDoubleClick}
      />
    </Card>);
}


export default DatagridTable;