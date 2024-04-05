import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./login.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSumbit = async () => {
    console.log("handleSumbit");
    console.log(user);
    console.log(password);

    try {
      const response = await axios.post("http://localhost:3008/login", {
        user_email: user,
        user_password: password,
      });
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/notes");
    } catch (e) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.Login} data-testid="Login">
      <Card sx={{ maxWidth: 375, margin: "auto" }}>
        <CardContent>
          <h1>Login</h1>
          <TextField
            id="outlined-basic"
            onChange={(e) => {
              setUser(e.target.value);
            }}
            label="usuario"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            variant="outlined"
          />

          <br />
          <br />
          <Button onClick={handleSumbit} variant="contained">
            Contained
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
