import {
  getLocalStorageRefreshToken,
  resetAuth,
  setLocalStorageAccessToken,
} from './auth';
import axios from 'axios';

export const API_URL = 'http://wozniak-dev-api.herokuapp.com/api';

export const LOCAL_API_URL = 'http://127.0.0.1:8000/api';

export const LOGO_URL =
  'https://ids-storage-football-prediction.s3-eu-west-1.amazonaws.com/imgs/logo2.png';

export const LOGO_WHITE_URL =
  'https://ids-storage-football-prediction.s3-eu-west-1.amazonaws.com/imgs/logo3.png';

export const LOGO_WITH_NAME_URL =
  'https://ids-storage-football-prediction.s3-eu-west-1.amazonaws.com/imgs/logo4.png';

export const refreshToken = async () => {
  const refreshToken = getLocalStorageRefreshToken().replace('\"', '');

  if (refreshToken) {
    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

    // exp date in token is expressed in seconds, while now() returns milliseconds:
    const now = Math.ceil(Date.now() / 1000);

    if (tokenParts.exp > now) {
      try {
        console.log(refreshToken, "<<< TOKEN");
        const { data } = await axios.post(`${API_URL}/user/token/refresh/`, {
          refresh: refreshToken,
        });
        setLocalStorageAccessToken(data.access);
      } catch (e) {
        console.error(e);
      }
    } else {
      resetAuth();
    }
  } else {
    resetAuth();
  }
};

export const logoutToken = async () => {
  const refreshToken = getLocalStorageRefreshToken();

  if (refreshToken) {
    try {
      await axios.post(`${API_URL}/user/logout/`, {
        refresh_token: refreshToken,
      });
    } catch (e) {
      console.error(e);
    }
  }
};
