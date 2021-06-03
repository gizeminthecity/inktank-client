export const ACCESS_TOKEN = "accessToken";

const URL = process.env.REACT_APP_SERVER_URL;

export const SERVER_URL = URL ? `${URL}/api` : `http://localhost:5005/api`;
