import React from 'react';
import styles from './Header.module.scss';
import StorageBackendSelector from '../StorageBackendSelector/StorageBackendSelector';

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.actionContainer}>
        <a className={styles.logo} href='/'>Markdown Writer</a>
        <StorageBackendSelector/>
      </div>
    </header>
  )
}

export default Header;