import React from 'react';
import {logout} from "../utils/auth";
import {useRouter} from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login')
  }

  return <button onClick={handleLogout}>LOGOUT</button>
};

export default LogoutButton;
