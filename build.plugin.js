const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const cfg = require('./config');

const APP_VERSION = cfg.app_version;   // 主版本号 . 子版本号 (功能更新) . 修订版本号（release编译版本号） . dev开发版本号
const APP_ENV = cfg.env.NODE_ENV;      // prod-正式, local-本地, test-测试, release-预发布, demo-Mock测试

module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig(config => {
    config.module
      .rule('new-rule')
      .test(/\.scss$/)
      .use('sass-loader', 'css-loader', 'mini-css')
      .loader('sass-loader', 'css-loader', MiniCssExtractPlugin.loader)

    config.plugin('HtmlWebpackPlugin').use(HtmlWebpackPlugin, [{ template: 'public/index.html' }])

    config.plugin('DefinePlugin', [{
      'process.env.APP_VERSION': JSON.stringify(APP_VERSION),
      'process.env.APP_ENV': JSON.stringify(APP_ENV),
      'process.env.APP_CONFIGS': JSON.stringify(cfg),
    }])

    config.output
      .path(path.resolve(__dirname))
      .filename('js/[name]-[hash].' + APP_ENV + '.v_' + APP_VERSION + '.js',)
      .chunkFilename('js/app_[name]-[chunkhash].' + APP_ENV + '.v_' + APP_VERSION + '.js')
  })
};