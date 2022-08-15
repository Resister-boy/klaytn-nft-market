import React from 'react'
import styles from '../styles/Header.module.css';
import Logo from './Logo';

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Logo />
      </div>
    </div>
  )
}

export default Header