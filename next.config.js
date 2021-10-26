const path = require("path");

const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");
const withFonts = require("next-fonts");
const withImages = require("next-images");

module.exports = withFonts(
  withImages({
    webpack: (config) => {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
          },
        },
      });

      return config;
    },
    trailingSlash: true,
  })
);
