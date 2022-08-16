import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.title}>Page</div>
        <div className={styles.description}><span>Not</span> Found</div>
      </div>
      <Link className={styles.homeButton} to="/" >Home</Link>
    </div>
  )
}

export default NotFound