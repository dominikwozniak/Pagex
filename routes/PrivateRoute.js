import React, { useEffect } from 'react';
import styles from '../styles/PrivateRoute.module.scss';
import { isLoggedIn } from '../utils/auth';
import Router from 'next/router';
import Navbar from '../components/navbar/navbar';
import { CircularProgress } from '@material-ui/core';

const PrivateRoute = ({ children }) => {
  useEffect(() => {
    if (!isLoggedIn()) {
      Router.push('/login');
    }
  }, []);

  if (!isLoggedIn()) {
    return null
      // <div className={styles.route__container}>
      //   <CircularProgress className={styles.route__loading} />
      // </div>

    ;
  } else {
    return (
      <div className={styles.route}>
        {children}
      </div>
    );
  }
};

export default PrivateRoute;
