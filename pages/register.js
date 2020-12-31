import React, { useState, useRef } from 'react'
import axios from 'axios'
import {API_URL, LOCAL_API_URL} from "../utils/helpers";
import {useRouter} from "next/router";
import {isLoggedIn} from "../utils/auth";
import LogoutButton from "../components/logoutButton";

const Register = () => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${LOCAL_API_URL}/user/register/`, {
        "email": emailRef.current.value,
        "first_name": firstNameRef.current.value,
        "last_name": lastNameRef.current.value,
        "password": passwordRef.current.value,
      })
      setError(false)
      router.push('/login')
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
        <input type='text' ref={firstNameRef} name='first-name' id='first-name' placeholder='First name' />
        <input type='text' ref={lastNameRef} name='last-name' id='last-name' placeholder='Last name' />
        <input type='password' ref={passwordRef} name='password' id='password' placeholder='Password' />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
