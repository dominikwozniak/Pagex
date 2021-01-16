import React from 'react';
import { logout } from '../../utils/auth';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

import styles from '../../styles/Button.module.scss';

import { createMuiTheme,withStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return <Button className={styles.logoutButton} onClick={handleLogout}>LOGOUT</Button>;
};

export default LogoutButton;
