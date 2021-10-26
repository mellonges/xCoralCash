import Auth from "@aws-amplify/auth";
import axios from "axios";
import Router from "next/router";

const request = (url, type = "get", data = undefined, headers = {}) => {
  return axios({
    url: url,
    method: type,
    data: data,
    headers: headers,
  });
};

const serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

const getHomePageTokens = () => {
  return request(`${process.env.S3_TOKENS_URL}/mainPeople.json`);
};

const getTokenImageUrl = (tokenName, size = "full") => {
  if (size === "full")
    return `${process.env.S3_STATIC_HOST}/photo_full_${tokenName}.jpg`;
  else if (size === "small")
    return `${process.env.S3_STATIC_HOST}/photo_${tokenName}.jpg`;
};

const searchTokensRequest = (data) => {
  return request(
    `${process.env.API_HOST}/search${data ? `?${serialize(data)}` : ""}`
  );
};

const getTokenInformation = async (ticker, isAuth) => {
  if (isAuth) {
    let user = await Auth.currentSession();

    let token = user && user.idToken.jwtToken;

    if (token)
      return request(
        `${process.env.API_HOST}/user/token/${ticker}`,
        "get",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
  } else return request(`${process.env.API_HOST}/token/${ticker}`);
};

const getTokensList = (params) => {
  return request(
    `${process.env.API_HOST}/prices${params ? `?${serialize(params)}` : ""}`
  );
};
const getCategoryImageUrl = (catId) => {
  return `${process.env.S3_STATIC_HOST}/cat_${catId}.jpg`;
};

const getCountries = () => {
  return request("/countries.json");
};

const getSupportedCrypto = () => {
  return request("https://dxyek3aqfjaay.cloudfront.net/coins.json");
};

const getCoinImageURL = (ticker, size = 50) => {
  return `https://d24va9fw68seps.cloudfront.net/coin_${ticker}.png`;
};

const previewCryptoDeposit = async (coinId, amount) => {
  try {
    let user = await Auth.currentSession(),
      token = user && user.idToken.jwtToken;

    return request(
      `${process.env.API_HOST}/deposit/preview`,
      "post",
      {
        coin: coinId,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    return {};
  }
};

const generateCryptoDeposit = async (coinId, amount) => {
  try {
    let user = await Auth.currentSession(),
      token = user && user.idToken.jwtToken;

    return request(
      `${process.env.API_HOST}/deposit/generate`,
      "post",
      {
        coin: coinId,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    return {};
  }
};

const previewCryptoWithdraw = async (coinId, amount) => {
  try {
    let user = await Auth.currentSession(),
      token = user && user.idToken.jwtToken;

    return request(
      `${process.env.API_HOST}/withdraw/preview`,
      "post",
      {
        coin: coinId,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    return {};
  }
};

const submitCryptoWithdraw = async (coinId, amount, address) => {
  try {
    let user = await Auth.currentSession(),
      token = user && user.idToken.jwtToken;

    return request(
      `${process.env.API_HOST}/withdraw/submit`,
      "post",
      {
        coin: coinId,
        amount,
        address,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    return {};
  }
};

const userSignUp = ({
  username,
  password,
  given_name,
  family_name,
  country,
}) => {
  return Auth.signUp({
    username,
    password,
    attributes: {
      given_name,
      family_name,
      "custom:country": country,
    },
  });
};

const userLogIn = ({ username, password }) => {
  return Auth.signIn({
    username,
    password,
  });
};

const resetPasswordRequest = (email) => {
  return Auth.forgotPassword(email);
};

const resendVerificationEmail = (email) => {
  return Auth.resendSignUp(email);
};

const submitVerificationCode = (email, code) => {
  return Auth.confirmSignUp(email, code);
};

const getCurrentUser = () => {
  return Auth.currentAuthenticatedUser();
};

const getCurrentUserInfo = () => {
  return Auth.currentUserInfo();
};

const generateNewPassword = (email, code, password) => {
  return Auth.forgotPasswordSubmit(email, code, password);
};

const logOut = () => {
  return Auth.signOut();
};

const getUserData = async (data) => {
  try {
    let user = await Auth.currentSession();

    let token = user && user.idToken.jwtToken;

    return request(
      `${process.env.API_HOST}/user/data`,
      "post",
      {
        data: data,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    Router.push("/signin");
    return {};
  }
};

const getTradeInfo = async (
  type,
  ticker,
  amountSpend,
  quantity,
  convertTo = null
) => {
  try {
    let user = await Auth.currentSession();

    let token = user && user.idToken.jwtToken;

    return request(
      `${process.env.API_HOST}/deal`,
      "POST",
      type === "buy"
        ? {
            dealType: type,
            buyData: {
              ticker,
              amountSpend,
              quantity,
            },
          }
        : type === "sell"
        ? {
            dealType: type,
            sellData: {
              ticker,
              quantity: +quantity,
            },
          }
        : {
            dealType: type,
            convertData: {
              convertFrom: ticker,
              convertInto: convertTo,
              quantity: +quantity,
            },
          },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (err) {
    Router.push("/signin");
    return {};
  }
};

const submitTrade = async (
  type,
  ticker,
  paymentType,
  paymentMethodID,
  chargeAmount,
  quantity,
  convertTo = null
) => {
  try {
    let user = await Auth.currentSession();

    let token = user && user.idToken.jwtToken;

    return request(
      `${process.env.API_HOST}/trade`,
      "POST",
      type === "buy"
        ? {
            dealType: type,
            buyData: {
              ticker,
              chargeAmount,
            },
            paymentType,
            cardInfo: paymentMethodID,
          }
        : type === "sell"
        ? {
            dealType: type,
            sellData: {
              ticker,
              quantity: +quantity,
            },
          }
        : {
            dealType: type,
            convertData: {
              convertFrom: ticker,
              convertInto: convertTo,
              quantity: +quantity,
            },
          },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (err) {
    Router.push("/signin");
    return {};
  }
};

const inviteFriendByEmail = async (email) => {
  try {
    let user = await Auth.currentSession();

    let token = user && user.idToken.jwtToken;
    return request(
      `${process.env.API_HOST}/invite?email=${email}`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (err) {
    Router.push("/signin");
    return {};
  }
};

const changeUserAttributes = async (data) => {
  let user = await Auth.currentAuthenticatedUser();

  return Auth.updateUserAttributes(user, data);
};

const changeUserPassword = async (oldPassword, newPassword) => {
  let user = await Auth.currentAuthenticatedUser();

  return new Promise((resolve, reject) => {
    user.changePassword(oldPassword, newPassword, function (err, result) {
      if (err) {
        resolve(err);
      }

      resolve(result);
    });
  });
};

export {
  getSupportedCrypto,
  getHomePageTokens,
  getTokenImageUrl,
  getCoinImageURL,
  searchTokensRequest,
  getTokenInformation,
  getTokensList,
  resetPasswordRequest,
  getCategoryImageUrl,
  getCountries,
  getCurrentUserInfo,
  userSignUp,
  userLogIn,
  resendVerificationEmail,
  submitVerificationCode,
  getCurrentUser,
  generateNewPassword,
  logOut,
  getUserData,
  getTradeInfo,
  inviteFriendByEmail,
  submitTrade,
  changeUserAttributes,
  changeUserPassword,
  previewCryptoDeposit,
  generateCryptoDeposit,
  previewCryptoWithdraw,
  submitCryptoWithdraw,
};
