const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = env =>{
  return merge(common,{
    mode:'development',
    devServer: {
      historyApiFallback: true,
      port: env.APP_PORT,
      compress: true,
      contentBase: path.resolve(__dirname, 'dist'),
    },
    devtool:'inline-source-map'
  });
} 