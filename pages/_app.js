import '../styles/globals.scss'
import { AuthProvider } from '../context/AuthContext'
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function MyApp({ Component, pageProps }) {
  return (
    <div className="App">
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
    <>
      <ToastContainer/>
    </>
    </div>
  )
}

export default MyApp
