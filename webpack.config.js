module.exports = {
  module: {
    rules: [
      {
        test: /\.csv$/,
        use: "csv-loader",
      },
    ],
  },
};
