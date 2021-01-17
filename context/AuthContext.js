import { createContext, useState, useEffect } from "react";
import { getLocalStorageEmail, refreshToken, getLocalStorageToken } from '../utils/auth';
import axios from 'axios';
import { API_URL } from '../utils/helpers';


const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [slug, setSlug] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    const storedEmail = getLocalStorageEmail()
    setUser(storedEmail)
  }, [user])


  useEffect(async () => {
    await refreshToken();

    const accessToken = getLocalStorageToken();

    if (accessToken) {
      try {
        const { data } = await axios.get(`${API_URL}/user/profile/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-type': 'Application/json',
          },
        });
        setUserInfo(data);
      } catch (e) {
        console.error(e);
      }
    }
  }, [user])

  useEffect(async () => {
    await refreshToken();

    const accessToken = getLocalStorageToken();

    if (accessToken) {
      try {
        const { data } = await axios.get(`${API_URL}/pages/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-type': 'Application/json',
          },
        });
        setSlug(data.slug)
      } catch (e) {
        console.error(e);
      }
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser, userInfo, slug, setSlug, isCreated, setIsCreated }}>
      {props.children}
    </AuthContext.Provider>
  );
};


export default AuthContext
