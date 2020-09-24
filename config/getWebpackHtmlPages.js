/*
 * @Author: yangying01
 * @Date: 2020-09-18 11:23:27
 * @LastEditors: yangying01
 * @LastEditTime: 2020-09-24 17:18:10
 * @Description: 获取多页面htmlwebpack配置数组
 * @version: 1.0.0
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

function getWebpackHtmlPages(entry, isEnvProduction){
  let webpackHtmlPages = {}
  Object.keys(entry).map((key) => {
    webpackHtmlPages[key] = new HtmlWebpackPlugin({
        inject: true,
        chunks: [key],
        template: paths.appHtml,
        filename: key == isEnvProduction?  'index.html' : `${key}.html`,
      })
  })

  return webpackHtmlPages
}


module.exports = getWebpackHtmlPages
