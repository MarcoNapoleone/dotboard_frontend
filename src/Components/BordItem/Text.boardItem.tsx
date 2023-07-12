import React from "react";
import {useTheme} from "@mui/material/styles";
import {
  alpha,
  Box,
  Card,
  CardActionArea,
  CardContent,
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
  title: string,
  caption: string,
  isLoading?: boolean,
  onClick?: () => void
}

const TextBoardItem: React.FC<CompanyCardProps> = (
    {
      title,
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
                <CardContent>
                  <Container>
                    <Typography gutterBottom variant="h4" component="div">
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {caption}
                    </Typography>
                  </Container>
                </CardContent>
              </CardActionArea>
            </Card>
        }
      </>
  )
}

export default TextBoardItem;