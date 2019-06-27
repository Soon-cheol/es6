const path = require('path');

module.exports = {
  entry: {
    app: [
      '@babel/polyfill',
      './src/app.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
        { test: /\.js?$/ },
        { exclude: /node_modules/ } ,
        { loader: 'babel-loader' },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
        {
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'url-loader?limit=10000',
        },
        {
            test: /\.(ttf|eot|svg)(\?[\s\S]r+)?$/,
            use: 'file-loader',
        },
        { test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery' },
    ]
  }
}
