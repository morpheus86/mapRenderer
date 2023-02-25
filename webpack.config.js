const path = require("path");
const dotenv = require("dotenv");

const HtmlWebpackPlugin = require("html-webpack-plugin");
env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
const GOOGLE_API_KEY = envKeys["process.env.GOOGLE_API_KEY"];
console.log("process.env.GOOGLE_API_KEY :>> ", envKeys);
const Dotenv = require("dotenv-webpack");
module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  devtool: "inline-source-map",
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new Dotenv({
      path: ".env",
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./index.html",
      GOOGLE_API_KEY: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`,
    }),
  ],
};
