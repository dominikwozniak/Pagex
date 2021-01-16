import { createContext, useState, useEffect } from "react";
import { getLocalStorageEmail, refreshToken, getLocalStorageToken } from '../utils/auth';
import axios from 'axios';
import { API_URL } from '../utils/helpers';


const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState('');
  const [userInfo, setUserInfo] = useState({});

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

  return (
    <AuthContext.Provider value={{ user, setUser, userInfo }}>
      {props.children}
    </AuthContext.Provider>
  );
};


export default AuthContext
