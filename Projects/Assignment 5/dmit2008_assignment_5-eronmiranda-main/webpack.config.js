const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


module.exports = {
  entry: './js/src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname,'build')
  },
  module: {
    rules:[
      {
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader'
        }
      },
      {
        test:/\.css$/i,
        use:[{
          loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      favicon: './favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename:'main.css'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname,'build'),
    compress: true,
    port: 9000
  }
}