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
  Grid,
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

type CompanyCardProps = {
  title: string,
  isLoading?: boolean,
  onClick?: () => void
}

const ButtonBoardItem: React.FC<CompanyCardProps> = (
    {
      title,
      isLoading,
      onClick
    }
) => {

  const theme = useTheme();

  return (
      <BaseBoardItem
        isLoading={isLoading}
        onClick={onClick}
        children={
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
        }
      />
  )
}

export default ButtonBoardItem;