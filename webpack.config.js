const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    // filename: 'game.js',
    path: path.resolve(__dirname, 'build', 'client'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Moba Royale',
      myPageHeader: 'Moba Royale',
      template: './src/client/index.html',
      filename: path.resolve(__dirname, 'build', 'client', 'index.html'),
    }),
  ],
};
