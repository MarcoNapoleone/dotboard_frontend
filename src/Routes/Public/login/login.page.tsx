import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from "react-router-dom";
import {Alert, alpha, Card, Checkbox, CircularProgress, Collapse, FormControlLabel, Zoom} from "@mui/material";
import {useTheme} from "@mui/material/styles";


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://google,com/">
        Argos
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [error, setError] = useState({status: false, message: 'error'});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

  };

  return (
    <Container component="main" maxWidth="sm">
      <Card variant="outlined" sx={{marginTop: 8, borderRadius: '32px'}}
      >
        <Box
          p={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              backgroundColor: alpha(theme.palette.secondary.main, 0.2),
            }}
          >
            {loading
              ? <Zoom in key={1}><CircularProgress color="secondary" size={24}/></Zoom>
              : <Zoom in key={2}><LockOutlinedIcon color="secondary"/></Zoom>
            }
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"/>}
              label="Remember me"
            />
            <Collapse in={error.status} sx={{my: 1}}>
              <Alert sx={{bgcolor: 'transparent', p: 0}} severity="error">{error.message}</Alert>
            </Collapse>
            <Button
              color="primary"
              type="submit"
              fullWidth
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.25),
                },
              }}
            ><Box mx={2}>
              Log In
            </Box>
            </Button>
          </Box>
        </Box>
      </Card>
      <Copyright sx={{mt: 8, mb: 4}}/>
    </Container>
  );
}
