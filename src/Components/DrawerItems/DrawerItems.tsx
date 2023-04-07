import * as React from "react";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';
import SensorsIcon from '@mui/icons-material/Sensors';

export const DrawerElements = [
  {index: 1, path: "boards", icon: <DashboardCustomizeOutlinedIcon color="inherit"/>, label: 'Boards'},
  {index: 2, path: "apis", icon: <DataObjectOutlinedIcon color="inherit"/>, label: 'APIs'},
];
