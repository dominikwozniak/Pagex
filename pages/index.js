import React from 'react';
import styles from '../styles/Home.module.scss';
import { LOGO_WHITE_URL } from '../utils/helpers';
import { isLoggedIn } from '../utils/auth';
import ActionButton from '../components/actionButton';
import Head from 'next/head';

const Index = () => {
  return (
    <div className={styles.home__container}>
      <Head>
        <title>PAGEX</title>
        <meta name="home page" content="home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.home__wrapper}>
        <div className={styles.home__logoWrapper}>
          <h3>Welcome in PAGEX</h3>
          <img src={LOGO_WHITE_URL} alt="logo" className={styles.home__logo} />
        </div>
        <h5>PAGEX is a quick way to create your OWN landing page!</h5>
        <p>Do you want to create your first website easily?</p>
        <p>If so, PAGEX is definitely for you!</p>

        {isLoggedIn() ? (
          <div className={styles.home__action}>
            <ActionButton content="GO TO DASHBOARD" path="/dashboard" />
          </div>
        ) : (
          <div className={styles.home__action}>
            <ActionButton content="SIGN IN" path="/login" />
            <p>or</p>
            <ActionButton content="SIGN UP" path="/register" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
