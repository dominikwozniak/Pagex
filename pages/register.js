import React, { useState, useRef } from 'react';
import styles from '../styles/Login.module.scss';
import axios from 'axios';
import { API_URL, LOCAL_API_URL } from '../utils/helpers';
import { useRouter } from 'next/router';
import { isLoggedIn } from '../utils/auth';
import LogoutButton from '../components/logoutButton/logoutButton';
import { Button, TextField } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Link from 'next/link';
import Head from 'next/head';

const Register = () => {
  const [registerError, setRegisterError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState({});
  const [firstNameError, setFirstNameError] = useState({});
  const [lastNameError, setLastNameError] = useState({});
  const [companyError, setCompanyError] = useState({});
  const [passwordLengthError, setPasswordLengthError] = useState({});
  const [confirmPasswordError, setConfirmPasswordError] = useState({});
  const router = useRouter();

  const formValidation = () => {
    const emailError = {};
    const firstNameError = {};
    const lastNameError = {};
    const companyError = {};
    const passwordLengthError = {};
    const confirmPasswordError = {};
    let isValidForm = true;

    if(firstName.trim().length < 3){
      firstNameError.firstNameShort = "First name is too short!";
      isValidForm = false;
    }
    if(firstName.trim().length > 32){
      firstNameError.firstNameLong = "First name is too long!";
      isValidForm = false;
    }
    if(lastName.trim().length < 3){
      lastNameError.lastNameShort = "Last name is too short!";
      isValidForm = false;
    }
    if(lastName.trim().length > 32){
      lastNameError.lastNameLong = "Last name is too long!";
      isValidForm = false;
    }
    if(companyName.trim().length < 2){
      companyError.companyNameShort = "Company name is too short!";
      isValidForm = false;
    }
    if(companyName.trim().length > 32){
      companyError.companyNameLong = "Company name is too long!";
      isValidForm = false;
    }
    const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!pattern.test(email)) {
      isValidForm = false;
      emailError.emailNotValid = "Please enter valid email address!";
    }
    if(password !== confirmPassword){
      confirmPasswordError.passwordNotTheSame = "Passwords are not the same!"
      isValidForm = false;
    }
    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setCompanyError(companyError);
    setEmailError(emailError);
    setPasswordLengthError(passwordLengthError);
    setConfirmPasswordError(confirmPasswordError);
    return isValidForm;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = formValidation();
    if(isValid){
      try {
        const res = await axios.post(`${API_URL}/user/register/`, {
          email: email,
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          password: password,
        });
        setRegisterError(false);
        router.push('/login');
      } catch (e) {
        setRegisterError(true);
        console.error(e);
      }
      setIsLoading(false);
    }
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
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }
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
        <title>Register page</title>
        <meta name="register page" content="register page" />
      </Head>
      <div className={styles.login__wrapper}>
        <h3 className={styles.login__heading}>Sign up to PAGEX</h3>
        {registerError && (
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
          {Object.keys(emailError).map((key) => {
            return <div style={{ color: "red" }
            }>{emailError[key]}</div>
          })}
          <TextField
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            className={styles.login__input}
            name="first-name"
            id="first-name"
            placeholder="First name"
          />
          {Object.keys(firstNameError).map((key) => {
            return <div style={{ color: "red" }
            }>{firstNameError[key]}</div>
          })}
          <TextField
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            className={styles.login__input}
            name="last-name"
            id="last-name"
            placeholder="Last name"
          />
          {Object.keys(lastNameError).map((key) => {
            return <div style={{ color: "red" }
            }>{lastNameError[key]}</div>
          })}
          <TextField
            type="text"
            value={companyName}
            onChange={handleCompanyNameChange}
            className={styles.login__input}
            name="company-name"
            id="company-name"
            placeholder="Company name"
          />
          {Object.keys(companyError).map((key) => {
            return <div style={{ color: "red" }
            }>{companyError[key]}</div>
          })}
          <TextField
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.login__input}
            name="password"
            id="password"
            placeholder="Password"
          />
          {Object.keys(passwordLengthError).map((key) => {
            return <div style={{ color: "red" }
            }>{passwordLengthError[key]}</div>
          })}
          <TextField
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            className={styles.login__input}
            name="confirm_password"
            id="confirm_password"
            placeholder="Confirm password"
          />
          {Object.keys(confirmPasswordError).map((key) => {
            return <div style={{ color: "red" }
            }>{confirmPasswordError[key]}</div>
          })}
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
