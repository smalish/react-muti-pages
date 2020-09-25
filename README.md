<!--
 * @Author: yangying01
 * @Date: 2020-09-24 18:24:34
 * @LastEditors: yangying01
 * @LastEditTime: 2020-09-25 18:38:42
 * @Description: 
-->
### react配置多页面

* entry修改
```
entry: {
    home: "./src/pages/home/index.js",
    about: "./src/pages/about/index.js",
}
```

* output修改

output.filename: 修改
```
filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
本地yarn start起服务多页面，所以 'static/js/bundle.js' 修改为 [name].bundle.js

```

* webpack-manifest-plugin配置修改

```
isEnvProduction &&
    new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          console.log('>>> pageName = ' + pageName)
          //默认是取entrypoints.main，但是多页面配置后我们的page名称是自定义的
          //所以可以取自定义的page名，build的时候能取到page名，所以build的时候配置改插件
          const entrypointFiles = entrypoints[pageName].filter(
            fileName => !fileName.endsWith('.map')
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
```


* html-webpack-plugin配置
多个页面就要对应配置多个

new HtmlWebpackPlugin({
    inject: true,
    chunks: ['home'],
    template: paths.appHtml,
    filename: 'home.html',
})
new HtmlWebpackPlugin({
    inject: true,
    chunks: ['about'],
    template: paths.appHtml,
    filename: 'about.html',
})

* path 修改打包路径配置

appBuild: pageName? resolveApp(`dist/${pageName}`) : resolveApp(`dist`),
appIndexJs: pageName? resolveModule(resolveApp, `src/pages/${pageName}/index`) : resolveModule(resolveApp, `src/index`),
  
---

entry可以读取src下文件自动获取
参考 config/getEntry.js
```
const glob = require('glob');
const path = require('path');

function getEntry(isEnvDevelopment) {
    let globPath = './src/pages/*/index.js'
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
```

---
html-webpack-plugin配置根据entry自动生成
参考config/getWebpackHtmlPages.js

