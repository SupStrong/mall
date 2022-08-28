const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const url = 'http://192.168.0.42'
module.exports = {
  // chainWebpack: config => {
  //   config.plugins.delete('prefetch')
  //   config.plugin('html').tap(args => {
  //     args[0].cdn = cdn
  //     return args
  //   })
  // },
  // baseUrl for deploy on prod, should change it based on deployment
  // publicPath: '/',
  configureWebpack: {
    resolve: {
      alias: {
        css: path.join(__dirname, 'src/assets/css'),
        '@tool': path.join(__dirname, 'src/commonTools')
      }
    },
    plugins: [
      // new HardSourceWebpackPlugin(),
      new CompressionWebpackPlugin({
        test: /\.js$|\.html$|\.css/,
        threshold: 10240,
        deleteOriginalAssets: false
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: path.resolve(__dirname, 'src/config/config.json'),
          to: path.resolve(__dirname, 'dist')
        }]
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all', // initial、async和all
        minSize: 30000, // 形成一个新代码块最小的体积
        maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
        maxInitialRequests: 3, // 最大初始化请求数
        automaticNameDelimiter: '~', // 打包分割符
        name: true,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/, // 打包第三方库
            chunks: 'all',
            priority: 10 // 优先级
          },
          common: { // 打包其余的的公共代码
            minChunks: 2, // 引入两次及以上被打包
            name: 'common', // 分离包的名字
            chunks: 'all',
            priority: 5
          }
        }
      }
    }
  },
  productionSourceMap: false, // 去掉打包之后js中自动生成的map文件
  devServer: {
    port: 4398,
    host: '0.0.0.0',
    hot: true,
    overlay: true,
    openPage: '/login',
    proxy: {
      '/api': {
        target: url, // 测试
        changeOrigin: true,
        secure: true, // 如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/api': 'api'
        }
      },
    }
  }
}
