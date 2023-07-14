import React, {FC} from "react";
import {useTheme} from "@mui/material/styles";
import {alpha, Avatar, Grid, Skeleton, Typography, useMediaQuery} from "@mui/material";

type PageTitleProps = {
  title: string,
  icon: any,
  loading?: boolean,
  children?: React.ReactNode,
}


const PageTitle: FC<PageTitleProps> = ({title, icon, loading, children}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container alignItems="center">
      {icon && <Grid item pr={isMobile ? 2 : 3}>
        {loading
          ? <Skeleton sx={{borderRadius: '16px'}} variant="rectangular" animation="wave">
            <Avatar
              sx={{
                height: isMobile ? theme => theme.spacing(6) : theme => theme.spacing(8),
                width: isMobile ? theme => theme.spacing(6) : theme => theme.spacing(8),
                bgcolor: 'primary.light',
              }}
              variant="rounded"
            >
              {icon}
            </Avatar>
          </Skeleton>
          : <Avatar
            sx={{
              height: isMobile ? theme => theme.spacing(6) : theme => theme.spacing(8),
              width: isMobile ? theme => theme.spacing(6) : theme => theme.spacing(8),
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
            }}
            variant="rounded"
          >
            {icon}
          </Avatar>
        }
      </Grid>}
      <Grid item pr={isMobile ? 2 : 3}>
        {loading
          ? <Skeleton animation="wave">
            <Typography variant={isMobile ? "h5" : "h3"} sx={{fontWeight: 800}}>
              loading
            </Typography>
          </Skeleton>
          : <Typography variant={isMobile ? "h5" : "h3"} sx={{fontWeight: 800}}>
            {title?.charAt(0).toUpperCase() + title?.slice(1)}
          </Typography>
        }
      </Grid>
      <Grid item pr={isMobile ? 2 : 3}>
        {children}
      </Grid>
    </Grid>
  );
}

export default PageTitle;