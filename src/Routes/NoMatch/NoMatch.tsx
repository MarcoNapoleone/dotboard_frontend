import {useLocation, useNavigate} from "react-router-dom";
import {Box, Container, Grid, IconButton, Typography} from "@mui/material";
import React from "react";
import {ArrowBack} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";

function NoMatch() {
  let location = useLocation();
  const navigate = useNavigate();
  return (
    <Box paddingTop="84px">
      <Container>
        <Grid container direction="row" spacing={4}>
          <Grid item xs={12} md={4}>
            <Grid container direction="column" alignItems="flex-start">
              <Grid item>
                <IconButton
                  size="large"
                  onClick={() => navigate(-1)}
                >
                  <ArrowBack/>
                </IconButton>
              </Grid>
              <Grid item>
                <Typography sx={{fontWeight: 900, fontSize: '10vh'}}>
                  Oops!
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="text.secondary" variant="body2">
                  Qualcosa è andato storto.
                  Nessun risultato per <code>{'"' + location.pathname + '"'}</code>, riprova o torna indietro.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <div
              style={{
                position: 'relative',
              }}
            >
              <img
                src="/Teamwork-gears.png"
                alt="404 - NOT FOUND, Teamwork gears"
                style={{
                  width: '100%',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: '16px',
                }}
              />
              <Typography
                sx={{
                  color: '#ffffff',
                  fontSize: '20vh',
                  fontWeight: 100,
                  position: 'absolute',
                  transform: 'translate(-49%,-50%)',
                  top: '50%',
                  left: '50%',
                }}
              >
                404
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NoMatch;