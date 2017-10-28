module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'app.bundle.js',
    path: 'dist'
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