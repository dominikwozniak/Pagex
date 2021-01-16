import '../styles/globals.scss'
import { AuthProvider } from '../context/AuthContext'
import React from 'react';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
