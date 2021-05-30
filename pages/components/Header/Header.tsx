import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './Header.module.scss';

const Header = () => {
  const [session] = useSession();

  return (
    <header className={styles.container}>

      <div className={styles.actionContainer}>
        <a className={styles.logo} href='/'>Markdown Writer</a>
        <button className={styles.actionButton}>New</button>
        <button className={styles.actionButton}>Open</button>
        <button className={styles.actionButton}>Save</button>
      </div>
      
      <div>
      {session && (
        <button onClick={() => signOut()}>Sign out</button>
      )}

      {!session && (
        <>
          <button onClick={() => signIn('google')}>Login with Google</button>
        </>
      )}
      </div>
      
    </header>
  )
}

export default Header;