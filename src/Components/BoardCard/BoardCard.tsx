import React from "react";
import {useTheme} from "@mui/material/styles";
import {alpha, Box, Card, CardActionArea, CardContent, Chip, Grid, Skeleton, Typography} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {getFormattedDate} from "../../utils/dateHandler";
import {Board} from "../../services/boards.services";

type CompanyCardProps = {
  board?: Board,
  isLoading?: boolean,
  onClick?: () => void
}

const BoardCard: React.FC<CompanyCardProps> = (
  {
    board,
    isLoading,
    onClick
  }
) => {

  const theme = useTheme();

  const getLabel = (company: Board) => {
   return 'ACTIVE'
  }

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
                <Grid container direction="row" justifyContent="space-between">
                <Grid item xs="auto" container alignItems="center" spacing={1}>
                  <Grid item>
                    <Box color="text.secondary">
                      <AccessTimeOutlinedIcon fontSize="small" color="inherit"/>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="body2" component="div" color="text.secondary">
                      {getFormattedDate(board.createdAt)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Typography gutterBottom variant="h5" component="div">
                {board.name}
              </Typography>
              <Chip
                  size="small"
                  sx={{
                    color: theme.palette.secondary.main,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                  }}
                  color={'secondary'}
                  label={getLabel(board)}
                />
            </CardContent>
          </CardActionArea>
        </Card>
      }
    </>
  )
}

export default BoardCard;