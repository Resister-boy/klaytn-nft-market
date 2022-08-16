import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import Logo from './Logo';

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Link className={styles.logo} to="/"> <Logo /> </Link>
        <nav className={styles.nav_container}>
          <Link className={styles.nav_item} to="/market">Market</Link>
          <Link className={styles.nav_item} to="/create">Create</Link>
          <Link className={styles.nav_item} to="/about">About</Link>
        </nav>
      </div>
    </div>
  )
}

export default Header