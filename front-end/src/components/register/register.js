import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./register.module.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3008/register", {
        user_email: userEmail,
        user_name: userName,
        user_last_name: userLastName,
        user_password: userPassword,
      });
      console.log(response.data);
      // Reset input fields after successful registration

      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/notes");
      setUserEmail("");
      setUserName("");
      setUserPassword("");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <div className={styles.Login} data-testid="Login">
      <Card sx={{ maxWidth: 375, margin: "auto" }}>
        <CardContent>
          <h1>Register</h1>
          <TextField
            id="outlined-basic"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            label="correo electronico"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            label="nombre "
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            onChange={(e) => {
              setUserLastName(e.target.value);
            }}
            label="apellido"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="password"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            type="password"
            variant="outlined"
          />

          <br />
          <br />
          <Button onClick={handleSumbit} variant="contained">
            Registro
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
