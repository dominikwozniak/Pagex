import { useContext } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import AuthContext from '../context/AuthContext';
import LogoutButton from '../components/logoutButton';
import { isLoggedIn } from '../utils/auth';

import PrivateRoute from '../routes/PrivateRoute';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <PrivateRoute>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="home page" content="home page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {user && (
          <main className={styles.main}>
            Hello {user}
            <LogoutButton />
          </main>
        )}
        <p>{isLoggedIn() ? 'TAK' : 'NIE'}</p>
      </div>
    </PrivateRoute>
  );
}
