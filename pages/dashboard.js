import { useContext } from 'react';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.scss';
import AuthContext from '../context/AuthContext';
import LogoutButton from '../components/logoutButton/logoutButton';

import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

import { isLoggedIn } from '../utils/auth';

import PrivateRoute from '../routes/PrivateRoute';

import { toast } from 'react-toastify';

export default function Dashboard() {
  const { user, userInfo } = useContext(AuthContext);
  const notify = () => {
    toast("Loggin Notification !");

    toast.success("Logged succesfuly", {
      position: toast.POSITION.TOP_CENTER
    });

    toast.error("Failed to loggin", {
      position: toast.POSITION.TOP_LEFT
    });
  };
  return (
    <PrivateRoute>
      <div className={styles.dashboard__container}>
        <Head>
          <title>Dashboard | PAGEX</title>
          <meta name="home page" content="home page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {user && userInfo && (
          <div className={styles.dashboard__wrapper}>
            <div className={styles.dashboard__companyCard}>
              <StyledAvatar>{ user[1].toUpperCase() }</StyledAvatar>
              <p>{userInfo.email}</p>
              <p>Created at: {userInfo.date_joined}</p>
            </div>
            <div className={styles.dashboard__optionsCard}>
              <AccordionPanel />
            </div>
            <div>
            {notify}
            </div>
            {/*<LogoutButton />*/}
          </div>

        )}
        <p>{isLoggedIn() ? 'TAK' : 'NIE'}</p>
      </div>
    </PrivateRoute>
  )
}
