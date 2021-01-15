const production = true;

export const GLOBAL_API_URL = 'http://wozniak-dev-api.herokuapp.com/api';

export const LOCAL_API_URL = 'http://127.0.0.1:8000/api';

export const API_URL = production ? GLOBAL_API_URL : LOCAL_API_URL;

export const LOGO_URL =
  'https://ids-storage-football-prediction.s3-eu-west-1.amazonaws.com/imgs/logo2.png';

export const LOGO_WHITE_URL =
  'https://ids-storage-football-prediction.s3-eu-west-1.amazonaws.com/imgs/logo3.png';

export const LOGO_WITH_NAME_URL =
  'https://ids-storage-football-prediction.s3-eu-west-1.amazonaws.com/imgs/logo4.png';
