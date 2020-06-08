const merge = require('webpack-merge');
const terserPlugin = require('terser-webpack-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode:'production',
  optimization:{
    minimize: true,
    minimizer:[
      new terserPlugin({test:/\.js(\?.*)?$/i}),
      new optimizeCssAssetsPlugin({})
    ]
  }
});
