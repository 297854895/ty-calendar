const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',

  entry: {
    index: './src/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'commonjs2'
  },

  externals: {
    "moment": "moment",
    "react": "react"
  },

  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        include: /src/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: ["@babel/env", "@babel/react"],
          plugins: [
            "@babel/plugin-proposal-class-properties"
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          // Don't waste time on Gzipping the cache
          cacheCompression: false,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
}
