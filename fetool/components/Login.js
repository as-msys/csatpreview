import { Button, Stack, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { setCookie } from "nookies";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async () => {
    //NEXT_PUBLIC as prefix to access it from clientside
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
        identifier: formData.username,
        password: formData.password,
      })
      .then((response) => {
        // Handle success.
        toast.success("Logged in Successfully");
        setCookie(null, "jwt", response.data.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        //To clear the data after storing it in database
        setFormData({
          username: "",
          password: "",
        });

        Router.push("/clients");
      })
      .catch((error) => {
        // Handle error.
        toast.error(error.response.data.error.message);
      });
  };

  const handleInput = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    //Get the previous data and replace only the changed attribute
    setFormData((nextFormData) => ({ ...nextFormData, [key]: value }));
  };

  return (
    <Box className="content">
      <Stack spacing={2} className="form">
        <Typography variant="h6" gutterBottom>
          Login
        </Typography>
        <TextField
          id="username"
          label="username"
          variant="outlined"
          title="Username"
          name="username"
          onChange={handleInput}
          value={formData.username}
          placeholder="Enter Username"
          fullWidth
        />

        <TextField
          id="password"
          label="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          title="password"
          name="password"
          onChange={handleInput}
          value={formData.password}
          placeholder="Enter a password"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          className="button"
          variant="contained"
          style={{ marginTop: "3rem" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
