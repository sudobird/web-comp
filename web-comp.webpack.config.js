const path = require('path');
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  /**
   * creating entry as on object {
   *   [name]: [complete file path]
   *   preact-app: ./src/components/preact-app/index.js
   * }
   *
   * use glob to return all index files in components.
   * filepath contains full path to index.js in each component.
   * component path is till component to extract its name.
   * */
  entry: glob.sync('./src/components/**/index.js').reduce((acc, filePath) => {
    const componentPath = filePath.replace('index.js', '');
    const componentName = path.parse(componentPath).name;
    acc[componentName] = filePath;
    return acc;
  }, {}),
  output: {
    path: path.join(__dirname, '/web-comp'),
    filename: './[name]/main.[contenthash].js'
  },
  // devtool : 'inline-source-map',
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      minSize: 10000,
      cacheGroups: {
        /**
         * bundle all node modules import and lib functions in common.
         * [\\/] is used because of different operating systems using either \ or / for directory paths.
         *
         * */
        core: { test: /(([\\/]node_modules[\\/])|(src[\\/]lib.+))/, name: "core", chunks: "all" }
      }
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'to-string-loader',
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'url-loader',
      },
    ]
  }
};
