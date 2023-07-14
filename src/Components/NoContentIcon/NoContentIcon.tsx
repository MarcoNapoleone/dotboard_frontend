import React from "react";
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';
import {useTheme} from "@mui/material/styles";
import {Stack, Typography} from "@mui/material";


const NoContentIcon = (props: { caption?: string }) => {
  const theme = useTheme();
  return (
    <Stack alignItems="center" justifyContent="center">
      <DataObjectOutlinedIcon sx={{color: theme.palette.text.secondary}}/>
      <Typography color="text.secondary" align="center">
        {Boolean(props.caption) ? props.caption : 'Non ci sono dati da mostrare'}
      </Typography>
    </Stack>
  )
}

export default NoContentIcon;