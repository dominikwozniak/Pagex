import React, { useState, useRef, useContext } from 'react'
import axios from 'axios'
import {API_URL, LOCAL_API_URL} from "../utils/helpers";
import {useRouter} from "next/router";
import AuthContext from "../context/AuthContext";
import {isLoggedIn, setAuth} from "../utils/auth";
import LogoutButton from "../components/logoutButton";

const Register = () => {
  const [error, setError] = useState(false);
  const { setUser } = useContext(AuthContext)
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post(`${LOCAL_API_URL}/user/token/`, {
        "email": emailRef.current.value,
        "password": passwordRef.current.value,
      })
      setError(false)
      setAuth(emailRef.current.value, data.access, data.refresh)
      setUser(emailRef.current.value)
      router.push('/')
    } catch (e) {
      setError(true)
      console.error(e)
    }
  }

  if (isLoggedIn()) {
    return (
      <div>
        Jesteś już zalogowany! Aby się wylogować nacisnij
        <LogoutButton/>
      </div>
    )
  }

  return (
    <div>
      { error && <p>Wystąpił błąd</p> }
      <form onSubmit={handleSubmit}>
        <input type='email' ref={emailRef} name='email-address' id='email-address' placeholder='E-mail' />
        <input type='password' ref={passwordRef} name='password' id='password' placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Register;
