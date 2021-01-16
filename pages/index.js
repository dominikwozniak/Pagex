import React from 'react';
import styles from '../styles/Home.module.scss';
import { LOGO_WHITE_URL } from '../utils/helpers';
import { isLoggedIn } from '../utils/auth';
import ActionButton from '../components/actionButton/actionButton';
import CardArray from '../components/cardArray/cardArray';
import Navbar from '../components/navbar/navbar';
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
      <Navbar/>
        <div className={styles.home__logoWrapper}>
          <h3>Welcome in PAGEX</h3>
          <img src={LOGO_WHITE_URL} alt="logo" className={styles.home__logo} />
        </div>
        <div className={styles.home__wrapper}>
          <h5>PAGEX is a quick way to create your OWN landing page!</h5>
          <p>Do you want to create first website for your company easily?</p>
          <p>If so, PAGEX is definitely for you!</p>

          {isLoggedIn() ? (
          <div className={styles.home__action}>
            <ActionButton content="GO TO DASHBOARD" path="/dashboard" />
          </div>
        ) : (
          <div className={styles.home__action}>
            <ActionButton content="Start NOW" path="register"/>
          </div>
        )}
        </div>

        <div className={styles.card__wrapper}> 
        {/* tu dac card array  */}
        <CardArray></CardArray>
        </div>
      </div>
    </div>
  );
};

export default Index;
