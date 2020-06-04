const path = require('path');
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: glob.sync('./src/components/**/index.js').reduce((acc, filePath) => {
    const componentPath = filePath.replace('index.js', '');
    const componentName = path.parse(componentPath).name;
    acc[componentName] = filePath;
    return acc;
  }, {}),
  output: {
    path: path.join(__dirname, '/build-dev'),
    filename: './[name]/main.js',
    jsonpFunction: 'wpJsonpWebComp'
  },
  devtool : 'inline-source-map',
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      minSize: 10000,
      cacheGroups: {
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
