/*
 * @Author: yangying01
 * @Date: 2020-09-18 10:57:09
 * @LastEditors: yangying01
 * @LastEditTime: 2020-09-24 17:45:29
 * @Description: 获取多页面入口地址
 * @version: 1.0.0
 */
const glob = require('glob');
const path = require('path');

function getEntry(isEnvDevelopment) {
    let globPath = 'src/pages/*/index.js'
    let files = glob.sync(globPath)
    let entries = {}
    let dirname, name, url = ''
    let dirArr = []
    for (let i = 0; i < files.length; i++) {
        dirname = path.dirname(files[i])
        dirArr = dirname.split('/')
        name = dirArr[dirArr.length - 1]
        url = dirname + '/index.js'
        entries[name] = [
            // Include an alternative client for WebpackDevServer. A client's job is to
            // connect to WebpackDevServer by a socket and get notified about changes.
            // When you save a file, the client will either apply hot updates (in case
            // of CSS changes), or refresh the page (in case of JS changes). When you
            // make a syntax error, this client will display a syntax error overlay.
            // Note: instead of the default WebpackDevServer client, we use a custom one
            // to bring better experience for Create React App users. You can replace
            // the line below with these two lines if you prefer the stock client:
            // require.resolve('webpack-dev-server/client') + '?/',
            // require.resolve('webpack/hot/dev-server'),
            isEnvDevelopment &&
              require.resolve('react-dev-utils/webpackHotDevClient'),
            // Finally, this is your app's code:
            url,
            // We include the app code last so that if there is a runtime error during
            // initialization, it doesn't blow up the WebpackDevServer client, and
            // changing JS code would still trigger a refresh.
          ].filter(Boolean)
    }
    return entries
}


module.exports = getEntry