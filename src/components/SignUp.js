import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SpinnerComponent from "./SpinnerComponent";
import { Alert, AlertTitle } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const defaultTheme = createTheme();

export default function SignUp() {
  let navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate("/");
    }
  })
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);
  const [openPass, setOpenPass] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const signInError = (error) =>
  toast.error(`Error Signing in!${error}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
        return;
      }, 4000);
      return;

    }
    if(password.length<5)
    {
      signInError(`Password must be atleast 5 characters long`);
      return;
    }
    if(userName.length<3)
    {
      signInError(`Username must be atleast 3 characters long`);
      return;
      
    }
    setIsLoading(true);
    setTimeout(async () => {
      if (password === confirmPassword) {
        let newUser = await SignInUser();

        console.log(newUser);
        if (newUser.code === 11000) {
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 4000);
          
        }
        if (newUser.success) {
          localStorage.setItem("token", newUser.token);
          navigate("/");
        }
      } else {
        setOpenPass(true);
        setTimeout(() => {
          setOpenPass(false);
        }, 4000);
        
      }
      setIsLoading(false);
    }, 2000);
  };

  const SignInUser = async () => {
    try {
      const server = "https://i-backend.vercel.app";
      const response = await fetch(`${server}/auth/createuser`, {
        method: "POST", // Set the HTTP method here
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header here
        },
        body: JSON.stringify({
          name: userName,
          email: email,
          password: password,
        }), // Set the request body here
      });

      const json = await response.json();
      // console.log(json);
      return json;
    } catch (error) {
      console.log(" adding " + error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {open && (
        
        <Alert variant="filled" severity="error">
        <AlertTitle>Error</AlertTitle>
        Email already in use
        </Alert>
        
      )}
      {openPass && (
        
        <Alert variant="filled" severity="error">
        <AlertTitle>Error</AlertTitle>
        Passwords do not match
        </Alert>
        
      )}
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="text"
              autoFocus
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              error={emailError}
              helperText={
                emailError ? "Please enter a valid email address" : ""
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="confirmpassword"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              disabled={isLoading }
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {isLoading ? <SpinnerComponent message={"signing in"} /> : null}
            <Grid container>
              <Grid item>
                Already have an account?
                <Link to="/login">
                  <button type="button" className="btn btn-primary mx-3">
                    Login
                  </button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
