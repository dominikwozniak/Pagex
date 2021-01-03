import React, { useState, useRef } from 'react';
import styles from '../styles/Login.module.scss';
import axios from 'axios';
import { API_URL, LOCAL_API_URL } from '../utils/helpers';
import { useRouter } from 'next/router';
import { isLoggedIn } from '../utils/auth';
import LogoutButton from '../components/logoutButton';
import { Button, TextField } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Link from 'next/link';
import Head from 'next/head';

const Register = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/user/register/`, {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      });
      setError(false);
      router.push('/login');
    } catch (e) {
      setError(true);
      console.error(e);
    }
    setIsLoading(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (isLoggedIn()) {
    return (
      <div>
        Jesteś już zalogowany! Aby się wylogować nacisnij
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className={styles.login__container}>
      <Head>
        <title>Register page</title>
        <meta name="register page" content="register page" />
      </Head>
      <div className={styles.login__wrapper}>
        <h3 className={styles.login__heading}>Sign up to XXX</h3>
        {error && (
          <div className={styles.login__error}>
            <ErrorOutlineIcon />
            Wystąpił błąd!
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
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            className={styles.login__input}
            name="first-name"
            id="first-name"
            placeholder="First name"
          />
          <TextField
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            className={styles.login__input}
            name="last-name"
            id="last-name"
            placeholder="Last name"
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
            {isLoading ? 'Loading...' : 'REGISTER'}
          </Button>
        </form>
        <p className={styles.login__paragraph}>
          If you have an account, <br /> you can login{' '}
          <Link href="/login">
            <a>HERE!</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
