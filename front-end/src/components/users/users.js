import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./users.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import User from "../user/user";
import Grid from "@mui/material/Grid";
//import Item from "@mui/material/Grid";
const Users = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const fetchUsers = async () => {
    console.log("fetchUsers");
    try {
      const response = await axios.get("http://localhost:3008/users");
      setUsers(response.data);
    } catch (e) {
      console.error("Error fetching users:", e);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.Users} data-testid="Users">
      Usuarios Registrados: &nbsp;
      {users.length}
      <Grid container>
        {users.map((user) => (
          <Grid item xs={12} md={6} lg={4}>
            <User user={user} refreshData={fetchUsers} />
          </Grid>
        ))}
      </Grid>
      <ul></ul>
    </div>
  );
};

Users.propTypes = {};

Users.defaultProps = {};

export default Users;
