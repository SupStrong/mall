const url = 'http://127.0.0.1:3000'
const ossUrl = 'https://aliyun-wb-bvqq7ezi1t.oss-cn-beijing.aliyuncs.com'

const CompressionPlugin = require("compression-webpack-plugin");
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '薯Yoyo-小红书，抖音模板设计平台',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'sogou_site_verification',
        content: 'PIh1QC4Dae'
      },  
      {
        name: 'keywords',
        hid: 'keywords',
        content: "模板，设计，免费，小红书模板"
      },
      {
        hid: 'description',
        name: 'description',
        content: '薯YoYo专为模板设计'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [{
      src: "/json/color.js",
      type: "text/javascript",
      chartset: "utf-8",
    }, {
      src: "/json/district.js",
      type: "text/javascript",
      chartset: "utf-8",
    },{
      src: "/json/text.js",
      type: "text/javascript",
      chartset: "utf-8",
    },{
      src: "/json/violate.js",
      type: "text/javascript",
      chartset: "utf-8",
    } ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/style/bootstrap.min.css',
    '@/assets/style/style.css',
    '@/assets/style/flex.scss',
    '@/assets/style/public.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    "@/plugins/cookies",
    {
      src: "@/plugins/axios",
      ssr: false,
    },
    {
      src: "@/plugins/waterfall",
      ssr: false,
    },
    {
      src: "@/plugins/jquery",
      ssr: false,
    },
    {
      src: "@/plugins/clipboard",
      ssr: false,
    }
  ],
  server: {
      port: 3000, // 线上端口
      host: '0.0.0.0', 
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10kb的数据进行压缩
        deleteOriginalAssets: false, // 是否删除原文件
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all", // initial、async和all
        minSize: 30000, // 形成一个新代码块最小的体积
        maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
        maxInitialRequests: 3, // 最大初始化请求数
        automaticNameDelimiter: "~", // 打包分割符
        name: true,
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/, // 打包第三方库
            chunks: "all",
            priority: 10, // 优先级
          },
          common: {
            // 打包其余的的公共代码
            minChunks: 2, // 引入两次及以上被打包
            name: "common", // 分离包的名字
            chunks: "all",
            priority: 5,
          },
        },
      },
    },
    productionSourceMap: false,
  },
  proxy: {
    '/api':{
      target:url,
      pathRewrite:{
        "^/api":''
      }
    },
    '/oss': {
      target: ossUrl,
      changeOrigin: false,
      pathRewrite: {
        '^/oss': '/oss'
      }
    },
  },
  axios: {
    proxy: true,
  },
}
