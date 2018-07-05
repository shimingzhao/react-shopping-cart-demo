const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

//import 'react-material-layout/dist/react-material-layout.min.css';

const config = {
  // Entry points to the project
  entry: {
    main: [
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      './src/index.js',
      "./src"
    ],
  },
  // Server Configuration options
  devServer: {
    historyApiFallback: true,
      contentBase: 'src/www', // Relative directory for base of server
      hot: true, // Live-reload
      inline: true,
      port: 3000, // Port Number
      // host: 'localhost', // Change to '0.0.0.0' for external facing server
      host: '0.0.0.0',
  },
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, 'build'), // Path of output file
    filename: 'index.js',
  },
  plugins: [

    new webpack.EnvironmentPlugin({
        NODE_ENV: 'development'
    }
  ),

    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Moves files
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        }
      },
      // {
      //   // whatwg-fetch use Promsie which IE11 doesn't support
      //   test: /\.js$/,
      //   include: [/whatwg-.*/],
      //   loader: 'babel-loader'
      // },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.(jpg|pem)/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.scss$/,
        use: [{
                loader: "style-loader" // creates style nodes from JS strings
              }, {
                loader: "css-loader" // translates CSS into CommonJS
              }, {
                loader: "sass-loader" // compiles Sass to CSS
              }]
      }
      //{ test: /\.scss/, exclude: /node_modules/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap&includePaths[]=node_modules/compass-mixins/lib'},
      // { test: /\.css$/, loader: 'style-loader!css-loader' }
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader'
      //   // include: /flexboxgrid/
      // }
    ],
  },
  // resolve: {
  //   moduleExtensions: ["-loader"],
  // }
};

module.exports = config;
