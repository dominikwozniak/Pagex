import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getLocalStorageEmail } from "../utils/auth";
import {refreshToken} from "../utils/helpers";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const storedEmail = getLocalStorageEmail()
    setUser(storedEmail)
  }, [user])

  useEffect(async () => {
    await refreshToken();
  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};


export default AuthContext
