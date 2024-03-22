import React from "react";
import PropTypes from "prop-types";
import styles from "./home.module.css";

const Home = () => (
  <div className={styles.Home} data-testid="Home">
    Home Component
    <div className={styles["contenedor-responsive"]}> un texto</div>
    <div className={styles["contenedor2"]}> un texto</div>
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
