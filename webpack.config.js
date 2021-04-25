const path                  = require('path');
const HtmlMinimizerPlugin   = require("html-minimizer-webpack-plugin");
const CopyPlugin            = require("copy-webpack-plugin");
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
// const UglifyJsPlugin        = require('uglifyjs-webpack-plugin');
const webpack               = require('webpack');


module.exports = {
  context: path.resolve(__dirname, 'source'),
  // entry: {
  //   main: './js/scripts.js',
  // },
  entry: './js/scripts.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/scripts.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'source'),
    port: 9000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: '**/*.txt'}//, to: 'build/', context: path.resolve(__dirname) }
      ],
    }),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css'
    // }),

    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      // chunkFilename: '[id].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
  optimization: {
    minimize: false,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`
      new HtmlMinimizerPlugin(),
    ],
  },
};
