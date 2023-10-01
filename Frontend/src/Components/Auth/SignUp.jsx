import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import { useState } from 'react';
import { Link as A, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import {initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"     

const firebaseConfig = {
      apiKey: "AIzaSyAHv_QXugn-smxh5Lfi3vLIPLDcP6sVCJM",
      authDomain: "media-278de.firebaseapp.com",
      projectId: "media-278de",
      storageBucket: "media-278de.appspot.com",
      messagingSenderId: "771437615938",
      appId: "1:771437615938:web:ae1c3e44ade265908b86db"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
    

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

export default function SignUp() {
      const [firstname, setFirstname] = useState("");
      const [lastname, setLastname] = useState("");
      const [email, setEmailname] = useState("");
      const [phone, setPhone] = useState("");
      const [password, setPassword] = useState("");
      const [disable, setDisable] = useState(false);
      const [sucess, setSuccess] = useState(false);
      const navigate = useNavigate();
      const [showOTP, setShowOTP] = useState(false);
      const [otp, setOTP] = useState("");

      const sendOTP = () => {
            if (phone !== "") {
                  setShowOTP(true);
                  const verify = new RecaptchaVerifier('recaptcha-container', {
                        'size': 'invisible',
                        'callback': (response) => {
                        }
                  }, auth);
                  signInWithPhoneNumber(auth, "+91" + phone, verify)
                  .then((confirmationResult) => {
                        window.confirmationResult =confirmationResult;
                  }).catch((error) => {
                        console.log(error);
                  });
            }
      }

      const signUp = () => {
            window.confirmationResult.confirm(otp).then((result) => {
                  sendData();
            }).catch((error) => {
                  console.log("Lv2", error);
            });
      }

      const sendData = async () => {
            setDisable(true);
            const response = await fetch("http://localhost:3000/user_auth", {
                        method : "POST",
                        headers : {
                              "Content-Type" : "application/json"
                        },
                        body : JSON.stringify({
                              firstname,
                              lastname,
                              email,
                              password
                        })
            });
            if (response.status === "ok") {
                  navigate("/");
            } else {
                  navigate("/")
            }
      }

      const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
            email: data.get('email'),
            password: data.get('password'),
      });
      };

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
                  Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                  <TextField
                        autoComplete="given-name"
                        name="firstName"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        autoComplete="family-name"
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmailname(e.target.value)}
                        autoComplete="email"
                  />
                  </Grid>
                  <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        type="number"
                        name="phoneNumber"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="phone"></TextField>
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <FormControlLabel
                        required
                        control={<Checkbox value="allowExtraEmails" color="primary" required />}
                        label="I agree to terms & conditions"
                  />
                  </Grid>
                  </Grid>
                  <div id="recaptcha-container"></div>
                  <Button
                  disabled={disable}
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={sendOTP}
                  sx={{ mt: 3, mb: 2 }}
                  >
                  Get OTP
                  </Button>
                  {
                        showOTP && (
                        <Box sx={{ mt: 3 }}>
                        <TextField
                        required
                        fullWidth
                        name="otp"
                        label="OTP"
                        type="number"
                        id="otp"
                        value={otp} 
                        onChange={(e) => setOTP(e.target.value)}
                        autoComplete="new-password"
                        />
                        <Button
                        disabled={disable}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={signUp}
                        >
                        Sign Up
                        </Button>
                        </Box>
                        )
                  }
                  <Grid container justifyContent="flex-end">
                  <Grid item>
                  <Button  variant="body2">
                        <A to="/login">Already have an account? Sign in</A>
                  </Button>
                  </Grid>
                  </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
            </Container>
      </ThemeProvider>
      );
}