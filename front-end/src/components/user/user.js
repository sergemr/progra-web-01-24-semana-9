import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./user.module.css";
import axios from "axios";
const User = ({ user, refreshData }) => {
  const [edit, setEdit] = useState(false);
  const [userId, setUserId] = useState(user.user_id);
  const [userEmail, setUserEmail] = useState(user.user_email);
  const [userName, setUserName] = useState(user.user_name);
  const [userLastName, setUserLastName] = useState(user.user_last_name);
  const [userPassword, setUserPassword] = useState(user.user_password);
  const deleteUser = async (user_id) => {
    console.log("deleteUser");
    try {
      await axios.delete(`http://localhost:3008/user/${user_id}`);
      // const newUsers = users.filter((user) => user.user_id !== user_id);
      //     setUsers(newUsers);
      refreshData();
    } catch (e) {
      console.error("Error deleting user:", e);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3008/users/${userId}`, {
        user_email: userEmail,
        user_name: userName,
        user_password: userPassword,
      });
      refreshData();
      // Redirect or show success message upon successful update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className={styles.User} data-testid="User">
      User: {user.user_name} {user.user_last_name} - {user.user_email}
      <button onClick={() => deleteUser(user.user_id)}>Eliminar</button>
      <button onClick={() => setEdit(!edit)}>Edit</button>
      <div style={{ display: edit ? "block" : "none" }}>
        <hr />
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Username:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Update</button>
        </form>{" "}
        <hr />
      </div>
    </div>
  );
};

User.propTypes = {};

User.defaultProps = {};

export default User;
