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

type CompanyCardProps = {
  title: string,
  isLoading?: boolean,
  onClick?: () => void
}

const TextBoardItem: React.FC<CompanyCardProps> = (
    {
      title,
      isLoading,
      onClick
    }
) => {

  const theme = useTheme();

  return (
      <>
        {isLoading
            ? <Skeleton variant="rectangular" width="100%" animation="wave" sx={{borderRadius: '16px'}}>
              <CardActionArea sx={{
                height: '100%',
              }} onClick={onClick}>
                <CardContent>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Box color="text.secondary">
                        <AccessTimeOutlinedIcon fontSize="small" color="inherit"/>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="body2" component="div" color="text.secondary">
                        loading
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography gutterBottom variant="h5" component="div">
                    loading
                  </Typography>
                  <Chip
                      size="small"
                      label="loading"
                  />
                </CardContent>
              </CardActionArea>
            </Skeleton>
            : <Card variant="outlined">
              <CardActionArea sx={{
                height: '100%',
              }} onClick={onClick} disabled={onClick === null}>
                <CardContent>
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
                </CardContent>
              </CardActionArea>
            </Card>
        }
      </>
  )
}

export default TextBoardItem;