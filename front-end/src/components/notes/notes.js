import React from 'react';
import PropTypes from 'prop-types';
import styles from './notes.module.css';

const Notes = () => (
  <div className={styles.Notes} data-testid="Notes">
    Notes Component
  </div>
);

Notes.propTypes = {};

Notes.defaultProps = {};

export default Notes;
