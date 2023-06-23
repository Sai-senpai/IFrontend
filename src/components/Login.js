import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/error.css";
import { useState, useEffect } from "react";
import SpinnerComponent from "./SpinnerComponent";

import "./css/error.css";

const Login = () => {
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
useEffect(()=>{
  if(localStorage.getItem('token')){
    navigate("/");
  }
})
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle login logic here
    setTimeout(async () => {
      console.log("Email:", email);
      console.log("Password:", password);
      let user = await LoginUser();
      // console.log(user.errors[0].msg);

      setEmail("");
      setPassword("");
      if (user.success) {
        localStorage.setItem("token", user.token);
        navigate("/");
      }
      setIsLoading(false);
    }, 2000);
  };

  const LoginUser = async () => {
    try {
      const server = "https://i-backend.vercel.app";
      const response = await fetch(`${server}/auth/login`, {
        method: "POST", // Set the HTTP method here
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header here
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }), // Set the request body here
      });

      if (!response.ok) {
        console.log("error");
        setIsInvalidCredentials(true);
        setTimeout(() => {
          setIsInvalidCredentials(false);
        }, 2000); // Duration for the shaking animation (in milliseconds)
      }
      const json = await response.json();
      // console.log(json);
      return json;
    } catch (error) {
      console.log("error fetching user" + error);
    }
  };
  const defaultTheme = createTheme();
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
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
              <LockOutlinedIcon />
            </Avatar>
            {isInvalidCredentials && (
              <div className="error-message">
                Invalid credentials. Please try again.
              </div>
            )}
            <Typography component="h1" variant="h5">
              Login
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
                onClick={handleSubmit}
              >
                Login
              </Button>
              {isLoading ? <SpinnerComponent message={"logging in"} /> : null}
              <Grid container>
                <Grid item>
                  Don't have an account?
                  <Link to="/signup">
                    <button type="button" className="btn btn-primary mx-3">
                      Sign Up
                    </button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
