import { RestClient } from '../constants/Globals';

function AttemptLoggingIn(username, password) {
  RestClient.interceptors.request.use((req) => {
    req.params.user = username;
    req.params.pwd = password;
  });
  /* RestClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status !== 200) {

      }
    },
  ); */
}

function IsTokenExpired(TokenExpiryDate) {
  let now = new Date();
  let expiryDate = new Date(TokenExpiryDate);
  return now >= expiryDate;
}
