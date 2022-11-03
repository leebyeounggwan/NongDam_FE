import axios from "axios";
const KAKAO_JAVASCRIPT_ID = "d8bfa097faa117e6f0444af10096ccd1";
const CLIENT_ID = "70c694cc264803900c72070ca488b4ed";
const REDIRECT_URI = "http://localhost:3000/code/auth";

const KAKAO_OAUTH_SERVER_URL = "https://kauth.kakao.com";

export const KAKAO_AUTH_URL =
  KAKAO_OAUTH_SERVER_URL +
  `/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const kakaoAuth = axios.create({
  baseURL: KAKAO_OAUTH_SERVER_URL,
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
  },
});
const initalize = () => {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JAVASCRIPT_ID);
  }
};

export const getUserInfo = (code) => {
  const requestUrl = `/oauth/token?grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`;
  kakaoAuth.post(requestUrl).then((response) => {
    let accessToken = response.data.access_token;
    initalize();
    window.Kakao.Auth.setAccessToken(accessToken);
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: (result) => {
        console.log(result);
      },
    });
  });
};
