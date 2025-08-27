const webpack = require('webpack');
const path = require('path');

module.exports = {
  //plugins: [new NodePolyfillPlugin()],
  entry: {
    popup: './js/popup.js',
    import: './js/import.js',
    service: './js/service.js',
    provider: './js/provider.js',
    connect: './js/connect.js',
    confirmTx: './js/confirmTx.js',
    signMsg: './js/signMsg.js',
    send: './js/send.js',
    balances: './js/balances.js',
    select: './js/select.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  target: 'web',
  mode: 'production',
  devtool: false,

  resolve: {
    // Optional: Ensure no conflicting fallbacks
    fallback: {
      buffer: require.resolve('buffer/')
    },
  },

  plugins:[
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ]
};
