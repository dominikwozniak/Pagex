import '../styles/globals.scss'
import { AuthProvider } from '../context/AuthContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';



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
