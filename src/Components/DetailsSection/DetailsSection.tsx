import React, {FC} from "react";
import {Box, Chip, Grid, Link, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

type DetailsSectionProps = {
  sectionTitle: string,
  sectionTextContent?: string | number | null,
  contentRedirect?: string,
  adornment?: string,
  fullWidth?: boolean,
  chip?: boolean,
  children?: React.ReactNode,
}

const DetailsSection: FC<DetailsSectionProps> = (
  {
    sectionTitle,
    sectionTextContent,
    children,
    contentRedirect,
    fullWidth,
    chip,
    adornment,
  }
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  if (sectionTextContent === ""
    || sectionTextContent === null
    || sectionTextContent === undefined
    || sectionTextContent === "01 Gen 0001"
    || sectionTextContent === "0001-01-01T00:00:00"
  )
    return (
      <Box>
        <Grid container alignItems="center">
          <Grid item xs={fullWidth ? 2 : 4}>
            <Typography variant="caption" color="text.secondary"><em>{sectionTitle}</em></Typography>
          </Grid>
          <Grid item xs container={isMobile} justifyContent="flex-end">
            <Typography color="text.secondary"><em>n/d</em></Typography>
          </Grid>
        </Grid>
      </Box>
    );
  else return (
    <Box>
      <Grid container alignItems="flex-start">
        <Grid item xs={fullWidth ? 2 : 4}>
          <Typography variant="caption" color="text.secondary"><em>{sectionTitle}</em></Typography>
        </Grid>
        {chip
            ? children
              ? <Grid item xs container={isMobile} justifyContent="flex-end">
              <Chip variant="filled" size="small" label={
                <Typography variant="caption">{children}</Typography>
              }/>
              </Grid>
              : <Grid item xs container={isMobile} justifyContent="flex-end">
              <Chip variant="filled" size="small" label={
                Boolean(contentRedirect)
                  ? <Link
                    underline="always"
                    key="1"
                    color="inherit"
                    href={contentRedirect}
                  >
                    {sectionTextContent}
                  </Link>
                  : Boolean(adornment)
                    ? <Typography>{sectionTextContent + ' ' + adornment}</Typography>
                    : <Typography>{sectionTextContent}</Typography>
              }/>
              </Grid>
            : children
              ? <Grid item xs container={isMobile} justifyContent="flex-end">
                <Typography variant="caption">{children}</Typography>
              </Grid>
              : <Grid item xs container={isMobile} justifyContent="flex-end">
                {Boolean(contentRedirect)
                  ? <Link
                    underline="always"
                    key="1"
                    color="inherit"
                    href={contentRedirect}
                  >
                    {sectionTextContent}
                  </Link>
                  : Boolean(adornment)
                    ? <Typography>{sectionTextContent + ' ' + adornment}</Typography>
                    : <Typography>{sectionTextContent}</Typography>
                }
              </Grid>
        }
      </Grid>
    </Box>
  );
}


export default DetailsSection;