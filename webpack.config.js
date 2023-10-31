const Path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
  const IS_DEV = env.mode === 'development';
  const IS_PROD = !IS_DEV;

  const getPlugins = () => {
    const plugins = [
      new HtmlPlugin({
        template: 'src/index.html'
      })
    ];

    if (IS_PROD) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'style-[contenthash:5].css'
        })
      );
    }

    return plugins;
  };

  const getStyleLoaders = () => {
    return [
      IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      'postcss-loader'
    ];
  };

  return {
    mode: IS_DEV ? 'development' : 'production',
    devtool: IS_DEV && 'inline-source-map',
    entry: Path.join(process.cwd(), 'src', 'script.js'),
    output: {
      path: Path.join(process.cwd(), 'dist'),
      filename: 'script-[contenthash:5].js',
      clean: true
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css']
    },

    devServer: {
      static: {
        directory: Path.join(process.cwd(), 'dist')
      },
      port: 9900,
      open: true,
      compress: true,
      historyApiFallback: true,
    },

    plugins: getPlugins(),

    module: {
      rules: [

        // loading js
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        },

        // loading styles
        {
          test: /\.(css)$/,
          use: getStyleLoaders()
        }
      ]
    }
  };
};
