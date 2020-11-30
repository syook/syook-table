const webpack = require('webpack');
const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');

// Common plugins
let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: "'production'",
    },
  }),
  new webpack.NamedModulesPlugin(),
];

const entry = [path.resolve(path.join(__dirname, './src/indexWeb.js'))];

module.exports = {
  mode: 'production',
  name: 'server',
  plugins: plugins,
  target: 'node',
  entry: entry,
  output: {
    publicPath: './lib/',
    path: path.resolve(__dirname, './lib/'),
    filename: 'react-tabulous.min.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          babelrc: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
  node: {
    Buffer: false,
    __dirname: false,
    __filename: false,
    console: false,
    global: false,
    process: false,
    debugger: false,
  },
};
