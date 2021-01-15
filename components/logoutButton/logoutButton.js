import React from 'react';
import { logout } from '../../utils/auth';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return <Button onClick={handleLogout}>LOGOUT ></Button>;
};

export default LogoutButton;
