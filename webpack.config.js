const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var webpack = require("webpack");
module.exports = {
  entry: {
    app: __dirname + "/src/index.tsx"
  },
  output: {
    // path: __dirname + "/dist",
    path: path.join(
      "E:/DEV/QLDD/bando/React_form/Components"
    ),
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ["raw-loader", "img-loader"]
      }
    ]
  },
  devServer: {
    writeToDisk: true
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  mode: "production"
};
