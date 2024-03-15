import React from "react";
import PropTypes from "prop-types";
import styles from "./login.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => (
  <div className={styles.Login} data-testid="Login">
    <Card sx={{ maxWidth: 375 }}>
      <CardContent>
        <h1>Login</h1>
        <TextField id="outlined-basic" label="usuario" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="password"
          type="password"
          variant="outlined"
        />

        <br />
        <br />
        <Button variant="contained">Contained</Button>
      </CardContent>
    </Card>
  </div>
);

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
