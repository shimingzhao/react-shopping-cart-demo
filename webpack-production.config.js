const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: {
    main: [
      "babel-polyfill",
      "./src/index.js",
      "./src"
    ],
  },
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: path.resolve(__dirname, 'build'), // Path of output file
    filename: 'index.js', // Name of output file
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      },
      BASENAME: JSON.stringify("/")
    }),
    // Minify the bundle
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    // }),
    // Transfer Files
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
        // options: {
        //   presets: ['react', 'es2015', 'stage-2'],
        //   plugins: [
        //         "transform-class-properties",
        //         "transform-flow-strip-types",
        //         "transform-object-rest-spread",
        //         "transform-es2015-arrow-functions"
        //   ]
        // }
        query: {
          //cacheDirectory: true,
          //plugins: ['transform-runtime'],

          // presets: [
          //   ["env", {
          //     "targets": {
          //       "browsers": [
          //         "Chrome >= 52",
          //         "FireFox >= 44",
          //         "Explorer 11",
          //         "last 4 Edge versions"
          //       ]
          //     }
          //   }],
          //   "react",
          //   //"es2015",
          //   "stage-0"
          // ],
          //
          // plugins: [
          //   "transform-class-properties",
          //   "transform-object-rest-spread",
          //   "syntax-class-properties"
          // ]


          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            //"syntax-flow",
            ["transform-class-properties", {"loose": true}],
            //"transform-flow-strip-types",
            "transform-object-rest-spread",
            "transform-es2015-classes",
            "transform-es2015-arrow-functions",
            "syntax-class-properties"
          ]

        },
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
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
    ],
  },
};

module.exports = config;
