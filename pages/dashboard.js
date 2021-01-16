import React, { useContext } from 'react';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.scss';
import AuthContext from '../context/AuthContext';
import LogoutButton from '../components/logoutButton/logoutButton';
import { isLoggedIn } from '../utils/auth';

import PrivateRoute from '../routes/PrivateRoute';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <PrivateRoute>
      <div className={styles.dashboard__container}>
        <Head>
          <title>Dashboard | PAGEX</title>
          <meta name="home page" content="home page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {user && (
          <main className={styles.dashboard__wrapper}>
            Hello {user}
            <LogoutButton />
          </main>
        )}
        <p>{isLoggedIn() ? 'TAK' : 'NIE'}</p>
      </div>
    </PrivateRoute>
  );
}
