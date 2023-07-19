import React from "react";
import {useTheme} from "@mui/material/styles";
import {
  alpha,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip, CircularProgress,
  Container,
  Grid, IconButton,
  Skeleton,
  Typography, Zoom
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {getFormattedDate} from "../../utils/dateHandler";
import {Board} from "../../services/boards.services";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Avatar from "@mui/material/Avatar";
import BaseBoardItem from "./Base.boardItem";
import {EditOutlined} from "@mui/icons-material";

type CompanyCardProps = {
  src?: string,
  title?: string,
  isLoading?: boolean,
  editMode?: boolean,
  onEdit?: () => void,
  onClick?: () => void
}

const ButtonBoardItem: React.FC<CompanyCardProps> = (
    {
      src,
      title,
      isLoading,
      editMode,
      onEdit,
      onClick
    }
) => {

  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{height: '100%'}}
    >
      {editMode
        && <Box sx={{position: 'absolute', top: '8px', right: '8px', zIndex: 1}}>
          <IconButton size="small" onClick={onEdit}>
            <EditOutlined/>
          </IconButton>
        </Box>}
      <CardActionArea
        sx={{
          height: '100%',
        }}
        onClick={onClick}
        disabled={!Boolean(onClick) || editMode}
        disableRipple={!Boolean(onClick) || editMode}
      >
        <Grid container alignItems="center" direction="column" spacing={1}>
          <Grid item>
            <Avatar
              sx={{
                m: 1,
                backgroundColor: alpha(theme.palette.secondary.main, 0.2),
              }}
            >
              {isLoading
                ? <Zoom in key={1}><CircularProgress color="secondary" size={24}/></Zoom>
                : <Zoom in key={2}><PowerSettingsNewIcon color="secondary"/></Zoom>
              }
            </Avatar>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              {title}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  )
}

export default ButtonBoardItem;