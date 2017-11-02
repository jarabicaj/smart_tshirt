module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    filename: 'app.bundle.js',
    path: 'server/dist'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
      }
    ]
  }
}