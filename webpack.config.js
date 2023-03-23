const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    placeOrder: "./src/js/PlaceOrder.js",
    orderHistory: "./src/js/OrderHistory.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
