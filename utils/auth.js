import { logoutToken } from './helpers';

export const isBrowser = () => typeof window !== 'undefined';

export const isLoggedIn = () => {
  const jwt = getLocalStorageToken();
  return !!jwt;
};

export const setLocalStorageAccessToken = (token) =>
  window.localStorage.setItem('access_token', JSON.stringify(token));

export const setLocalStorageRefreshToken = (token) =>
  window.localStorage.setItem('refresh_token', JSON.stringify(token));

export const setLocalStorageEmail = (email) =>
  window.localStorage.setItem('email', JSON.stringify(email));

export const getLocalStorageToken = () =>
  isBrowser() && window.localStorage.getItem('access_token')
    ? window.localStorage.getItem('access_token').replace('"', '').replace('"', '')
    : '';

export const getLocalStorageRefreshToken = () =>
  isBrowser() && window.localStorage.getItem('refresh_token')
    ? window.localStorage.getItem('refresh_token').replace('"', '').replace('"', '')
    : '';

export const getLocalStorageEmail = () =>
  isBrowser() && window.localStorage.getItem('email')
    ? window.localStorage.getItem('email')
    : '';

export const removeLocalStorageToken = () =>
  window.localStorage.removeItem('access_token');

export const removeLocalStorageRefreshToken = () =>
  window.localStorage.removeItem('refresh_token');

export const removeLocalStorageEmail = () =>
  window.localStorage.removeItem('email');

export const setAuth = (email, access, refresh) => {
  setLocalStorageEmail(email);
  setLocalStorageAccessToken(access);
  setLocalStorageRefreshToken(refresh);
};

export const resetAuth = () => {
  removeLocalStorageToken();
  removeLocalStorageRefreshToken();
  removeLocalStorageEmail();
};

export const logout = () => {
  logoutToken();
  resetAuth();
};
