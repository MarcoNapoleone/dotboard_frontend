import React from "react";
import {createTheme, useTheme} from "@mui/material/styles";
import {createStyles, makeStyles, Stack, Typography} from "@mui/material";
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';

const defaultTheme = createTheme();
const useStyles = makeStyles((theme) => createStyles({
  root: {
    flexDirection: 'column',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
  },
}), {defaultTheme},);

const EmptyGridContent = (props: { caption?: string }) => {
  const theme = useTheme();
  return (
    <Stack alignItems="center" justifyContent="center">
      <DataObjectOutlinedIcon sx={{color: theme.palette.text.secondary}}/>
      <Typography color="text.secondary" align="center">
        {Boolean(props.caption) ? props.caption : 'No data'}
      </Typography>
    </Stack>
  )
}

export default EmptyGridContent;