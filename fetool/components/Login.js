import { Button, Stack, TextField } from "@mui/material";
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

  const handleLogin = async () => {
    await axios
      .post("http://localhost:1337/api/auth/local", {
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
       
        
        Router.push("/clients");
      })
      .catch((error) => {
        // Handle error.
        toast.error(error.response.data.error.message);
        
      });
      //To clear the data after storing it in database
      setFormData({
        username: "",
        password: "",
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
        <h2 className="title">Login</h2>
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
          variant="outlined"
          title="password"
          name="password"
          onChange={handleInput}
          value={formData.password}
          placeholder="Enter a password"
          fullWidth
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