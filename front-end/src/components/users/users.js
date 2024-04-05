import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./users.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import User from "../user/user";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
//import Item from "@mui/material/Grid";
const Users = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const fetchUsers = async () => {
    console.log("fetchUsers");
    try {
      const response = await axios.get("http://localhost:3008/users", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setUsers(response.data);
    } catch (e) {
      console.error("Error fetching users:", e);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilter = (e) => {
    const { value } = e.target;
    const filteredUsers = users.filter((user) => {
      return user.user_name.toLowerCase().includes(value.toLowerCase());
    });
    setUsers(filteredUsers);
  };
  return (
    <div className={styles.Users} data-testid="Users">
      Usuarios Registrados: &nbsp;
      {users.length}
      <Grid container>
        <Grid spacing={2} item xs={12}>
          <TextField
            id="outlined-basic"
            onChange={handleFilter}
            label="Outlined"
            variant="outlined"
          />
        </Grid>
        <hr />
      </Grid>
      <Grid container>
        {users.map((user, index) => (
          <Grid item xs={12} md={6} lg={4}>
            <User user={user} refreshData={fetchUsers} />
          </Grid>
        ))}

        {users.forEach((user) => {
          console.log("user: forEach", user);
        })}
      </Grid>
      <ul></ul>
    </div>
  );
};

Users.propTypes = {};

Users.defaultProps = {};

export default Users;
