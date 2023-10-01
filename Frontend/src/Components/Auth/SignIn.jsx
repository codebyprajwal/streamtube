import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as A, useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import MicroRecord from '../Common/MicroRecord';

function Copyright(props) {
  return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <A color="inherit" href="#">
            Streamland
            </A>{' '}
            {new Date().getFullYear()}
            {'.'}
      </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [disable, setDisable] = useState(false);
      const navigate = useNavigate();


      const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
            email: data.get('email'),
            password: data.get('password'),
      });
};

const sendData = async () => {
      setDisable(true);
      const response = await fetch("http://localhost:3000/login", {
                  method : "POST",
                  headers : {
                        "Content-Type" : "application/json"
                  },
                  body : JSON.stringify({
                        email,
                        password
                  })
      });
      const data = await response.json();

      if (data.status == "ok") {
            navigate("/")
      } else {
            setDisable(true);
      }
}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
            <Box
            sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                  Sign in
            </Typography>
            {
                  disable && <Alert severity="warning">User Credientials are In-Correct</Alert>
            }
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  />
                  <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  />
                  <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  />
                  <Button
                  type="submit"
                  fullWidth
                  onClick={sendData}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  >
                  Sign In
                  </Button>
                  <Grid container>
                  <Grid item xs>
                  {/* <Link href="#" variant="body2">
                        Forgot password?
                  </Link> */}
                  </Grid>
                  <Grid item>
                  <Button  variant="body2" >
                        <A to="/signup">{"Don't have an account? Sign Up"}</A>
                  </Button>
                  </Grid>
                  </Grid>
            </Box>
            <MicroRecord />
            </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      
    </ThemeProvider>
  );
}