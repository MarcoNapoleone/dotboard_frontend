import React from "react";
import {useTheme} from "@mui/material/styles";
import {
  alpha,
  Box,
  Card,
  CardActionArea,
  CardContent, CardMedia,
  Chip,
  Container,
  Grid,
  Skeleton,
  Typography
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {getFormattedDate} from "../../utils/dateHandler";
import {Board} from "../../services/boards.services";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

type CompanyCardProps = {
  caption: string,
  picture: string,
  isLoading?: boolean,
  onClick?: () => void
}

const TextBoardItem: React.FC<CompanyCardProps> = (
    {
      picture,
      caption,
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
              }} onClick={onClick}>
                <CardMedia
                    component="img"
                    height="194"
                    image={picture}
                    alt={caption}
                />
                <CardContent>
                  {Boolean(caption) && <Typography gutterBottom variant="caption" component="div">
                    {caption}
                  </Typography>}
                </CardContent>
              </CardActionArea>
            </Card>
        }
      </>
  )
}

export default TextBoardItem;