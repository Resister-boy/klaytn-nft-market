import React from 'react';
import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.title} >Your NFT Market</div>
      <div className={styles.copyright}>ⓒ{ new Date().getFullYear() } All Right Resolved.</div>

    </div>
  )
}

export default Footer