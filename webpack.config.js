/**
 * webpack.config.js
 * Webpack configuration for package development environment
 */

// Node Modules
const webpack = require('webpack');
const path = require('path');

// Constants
const {build, express, local, npm} = require('./app.json');

const CONFIG = {
  entry: build.entry,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, build.output.path),
    filename: 'main.bundle.js',
    publicPath: path.resolve(__dirname, build.output.publicPath),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = (env) => {
  if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development') {
    CONFIG.mode = 'development';
    if (env && env.express) {
      // Sets Hot Loading config and plugins
      CONFIG.entry.index = [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './src/hot',
      ];
      CONFIG.devtool = 'eval-source-map';
      CONFIG.output.hotUpdateChunkFilename = '.hot/[id].[hash].hot-update.js';
      CONFIG.output.hotUpdateMainFilename = '.hot/[hash].hot-update.json';
      CONFIG.plugins = [new webpack.HotModuleReplacementPlugin()];
    }
  } else {
    CONFIG.mode = 'production';
  }

  if (env) {
    if (env.local) {
      CONFIG.output.path = path.resolve(__dirname, local.output.path);
    } else if (env.express) {
      CONFIG.output.path = path.resolve(__dirname, express.output.path);
    } else if (env.npm) {
      CONFIG.mode = 'production';
      CONFIG.output.filename = npm.output.filename;
    }
  }
  return CONFIG;
};
