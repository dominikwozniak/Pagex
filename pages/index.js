import React from 'react';
import styles from '../styles/Home.module.scss';
import { LOGO_WHITE_URL } from '../utils/helpers';
import { isLoggedIn } from '../utils/auth';
import ActionButton from '../components/actionButton/actionButton';
import CardArray from '../components/cardArray/cardArray';
import Navbar from '../components/navbar/navbar';
import Head from 'next/head';
import Link from 'next/link';


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
          <h5>PAGEX is a quick way to create your own landing page!</h5>
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
      </div>
      <div className={styles.about__wrapper}>
        <h3>Say hello for our solutions</h3>
        <p style={{fontSize: '22px', textAlign: 'center', color: '#292928'}}>Save time and create a website for your company now</p>
        <div className={styles.about__cards}>
          <div className={styles.about__card}>
            <h2>Less work for you</h2>
            <p style={{fontSize: '18px', fontWeight: 200}}>We combine all your requirements to present and develop your company</p>
          </div>
          <div className={styles.about__card}>
            <h2>Super flexible</h2>
            <p style={{fontSize: '18px', fontWeight: 200}}>We support various types of businesses and access to data analysis</p>
          </div>
          <div className={styles.about__card}>
            <h2>Everyone saves</h2>
            <p style={{fontSize: '18px', fontWeight: 200}}>All services are available immediately to each user</p>
          </div>
        </div>
        {isLoggedIn() ? (
          <div></div>
        ) : (
          <div className={styles.home__action} style={{marginBottom: '4em'}}>
            <ActionButton content="Try it yourself" path="register"/>
          </div>
        )}
      </div>
      <div className={styles.services__wrapper}>
        <h3>Our services</h3>
        <p style={{fontSize: '22px', textAlign: 'center', color: '#e9c3ff'}}>
          Use our solutions for the development of your company
        </p>
        <div className={styles.services__cards}>
          <div className={styles.services__card}>
            <h2>Plans for any budget</h2>
            <p style={{fontSize: '18px', fontWeight: 200}}>
              Start for free and get your website running quickly. Upgrade for advanced customization.
            </p>
          </div>
          <div className={styles.services__card}>
            <h2>Company, CV or both</h2>
            <p style={{fontSize: '18px', fontWeight: 200}}>
              Build a company landing page or portfolio, or a combination of both. Write about your ideas and plans, build a beautiful website.
            </p>
          </div>
        </div>
        <div className={styles.services__cards}>
          <div className={styles.services__card}>
            <h2>Intuitive editor</h2>
            <p style={{fontSize: '18px', fontWeight: 200}}>
              Our editor is fast, intuitive, and includes all features you needed.
            </p>
          </div>
          <div className={styles.services__card}>
            <h2>Let's be in touch</h2>
            <p style={{fontSize: '18px', fontWeight: 200}}>
              Keep your company in touch with customers
            </p>
          </div>
        </div>
        <div className={styles.services__cards}>
          <div className={styles.services__card}>
            <h2>Optimize your growth</h2>
            <p style={{fontSize: '18px', fontWeight: 200}}>
              Thanks to the data analysis option you can analyze the development of your company
            </p>
          </div>
          <div className={styles.services__card}>
            <h2>Mobile and desktop</h2>
            <p style={{fontSize: '18px', fontWeight: 200}}>
              Update your website from anywhere with mobile and desktop apps
            </p>
          </div>
          {isLoggedIn() ? (
            <div></div>
          ) : (
            <div className={styles.home__action} style={{marginBottom: '4em'}}>
              <ActionButton content="Join us now" path="register"/>
            </div>
          )}
        </div>
      </div>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__logo}>
          <h3>PAGEX</h3>
          <img
            src="https://ids-storage-football-prediction.s3-eu-west-1.amazonaws.com/imgs/logo2.png"
            alt="pagexlogo" style={{width: '50px'}}
          />
        </div>
        <p style={{color: '#292928'}}>
          PAGEX is the comprehensive system to support your business among amateurs and professionals.
        </p>
        <div className={styles.footer__link}>
          <a style={{marginRight: '3em'}} href="mailto:noteneo.project@gmail.com">Contact</a>
          <Link href="/login/">
            <a style={{marginRight: '3em'}}>Login</a>
          </Link>
          <Link href="/register/">
            <a style={{marginRight: '3em'}}>Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
