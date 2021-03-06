import React, { useState, useRef, useContext } from 'react';
import styles from '../styles/Login.module.scss';
import axios from 'axios';
import { API_URL, LOCAL_API_URL } from '../utils/helpers';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';
import { isLoggedIn, setAuth } from '../utils/auth';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import LogoutButton from '../components/logoutButton/logoutButton';
import { Button, TextField } from '@material-ui/core';
import Link from 'next/link';
import Head from 'next/head';

import { toast } from 'react-toastify';

const Register = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    const notifySuccess = () => {
      toast.success("Logged succesfuly", {
        position: toast.POSITION.TOP_RIGHT
      });
    };
    const notifyError = () => {
      toast.error("Failed to loggin", {
        position: toast.POSITION.TOP_RIGHT
      });
    };
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/user/token/`, {
        email: email,
        password: password,
      });
      setError(false);
      setAuth(email, data.access, data.refresh);
      setUser(email);
      router.push('/dashboard');
      notifySuccess();
    } catch (e) {
      setError(true);
      console.error(e);
      notifyError();
    }
    setIsLoading(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (isLoggedIn()) {
    return (
      <div>
        You are already log in! If you want to log out press
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className={styles.login__container}>
      <Head>
        <title>Login page</title>
        <meta name="login page" content="login page" />
      </Head>
      <div className={styles.login__wrapper}>
        <h3 className={styles.login__heading}>Sign in to PAGEX</h3>
        {error && (
          <div className={styles.login__error}>
            <ErrorOutlineIcon />
            An error occurred!
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles.login__form}>
          <TextField
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.login__input}
            name="email-address"
            id="email-address"
            placeholder="E-mail"
          />
          <TextField
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.login__input}
            name="password"
            id="password"
            placeholder="Password"
          />
          <Button className={styles.login__button} type="submit">
            {isLoading ? 'Loading...' : 'LOGIN'}
          </Button>
        </form>
        <p className={styles.login__paragraph}>
          If you don't have an account, <br /> you can create one{' '}
          <Link href="/register">
            <a>HERE!</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
