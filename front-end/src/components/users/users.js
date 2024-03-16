import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./users.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import User from "../user/user";
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
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            <User user={user} refreshData={fetchUsers} />
          </li>
        ))}
      </ul>
    </div>
  );
};

Users.propTypes = {};

Users.defaultProps = {};

export default Users;
