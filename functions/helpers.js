import moment from "moment";
import React from "react";
import validator from "validator";

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const calcPriceChange = (oldPrice, newPrice) => {
  return (((newPrice - oldPrice) / oldPrice) * 100).toFixed(2);
};

const formatPrice = (number) => {
  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);

  return numberFormat.format(number);
};

const formatPercent = (percent) => {
  return parseFloat(percent).toFixed(2) + "%";
};

const AccountContext = React.createContext();

const calculateAllocationAndAddToArray = (
  assetsArray,
  portfolioMarketValue
) => {
  if (assetsArray && assetsArray.length && portfolioMarketValue) {
    let newArray = [];

    assetsArray.map((asset, index) => {
      let assetRes = asset;
      assetRes.allocation = (asset.marketValue / portfolioMarketValue) * 100;
      newArray.push(assetRes);
    });

    return newArray;
  }

  return assetsArray;
};

function capitalizeFirstLetter(str) {
  if (!str) return str;

  str = str.toLowerCase();

  return str[0].toUpperCase() + str.slice(1);
}
const actualizeGraphData = (data, selectedPeriod) => {
  if (data.length) {
    var lastVal = data[data.length - 1];
    var lastTimestamp = lastVal.x;
    var lastPrice = lastVal.y;
    var currentTime = moment().unix();

    var seconds = 300;
    var totalCount = 288;

    if (selectedPeriod.period === "1M") {
      seconds = 7200;
      totalCount = 360;
    } else if (selectedPeriod.period === "1Y") {
      seconds = 86400;
      totalCount = 365;
    }

    if (lastTimestamp < currentTime) {
      // Need to add some data

      var actualData = [];

      while (currentTime > lastTimestamp && actualData.length < totalCount) {
        actualData = [
          {
            x: moment.unix(currentTime).format("YYYY-MM-DD HH:mm:ss"),
            y: lastPrice,
          },
          ...actualData,
        ];

        currentTime = currentTime - seconds;
      }

      // Check if we need to concat actual data with data from the backend (when system reach lastTimestamp but not have enough values for displaying)
      if (actualData.length < totalCount) {
        // get difference count
        var remainCount = totalCount - actualData.length;
        var needElementsToConcat = data
          .slice(Math.max(data.length - remainCount, 1))
          .map((d) => ({
            x: moment.unix(d.x).format("YYYY-MM-DD HH:mm:ss"),
            y: d.y,
          }));

        actualData = [...needElementsToConcat, ...actualData];
      }

      return actualData;
    } else {
      // Prepare for the ChartJS
      data = data.map((d) => ({
        x: moment.unix(d.x).format("YYYY-MM-DD HH:mm:ss"),
        y: d.y,
      }));
    }

    return data;
  }

  return [{ x: null, y: 0 }];
};

const checkPasswordFitRules = (password, setState) => {
  let fitRules = {};

  if (!validator.isEmpty(password)) {
    if (
      validator.isStrongPassword(password, {
        minSymbols: 0,
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
      })
    )
      return setState({
        uppercase: true,
        lowercase: true,
        number: true,
        wordLength: true,
      });

    // Check one uppercase letter

    if (/[A-Z]/.test(password)) fitRules.uppercase = true;
    if (/[a-z]/.test(password)) fitRules.lowercase = true;
    if (password.length >= 8) fitRules.wordLength = true;
    if (/\d/.test(password)) fitRules.number = true;

    setState(fitRules);
  } else setState({});
};

// TODO: add advance token check
const checkCryptoAddress = (address, ticker) => {
  return address.length > 5;
};

const getTokenIconUrl = (ticker) => {
  return `https://d24va9fw68seps.cloudfront.net/coin_${ticker}.png`;
};

export {
  shuffle,
  formatPrice,
  formatPercent,
  actualizeGraphData,
  calcPriceChange,
  checkPasswordFitRules,
  calculateAllocationAndAddToArray,
  capitalizeFirstLetter,
  AccountContext,
  getTokenIconUrl,
  checkCryptoAddress,
};
