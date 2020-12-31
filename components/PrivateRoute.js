import React from 'react';
import {isLoggedIn} from "../utils/auth";
import Router from "next/router";
import Link from "next/link";

const PrivateRoute = ({ children }) => {

  if (!isLoggedIn()) {
    return (
      <>
        Brak dostępu!
        <Link href='/login'><a>LOGIN</a></Link>
        <Link href='/register'><a>REGISTER</a></Link>
      </>
    )
  } else {
    return (
      <>
        { children }
      </>
    )
  }
};

export default PrivateRoute;
