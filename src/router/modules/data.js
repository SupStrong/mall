const dataPage = () => import('@/views/data/data')
const Layout = () => import('@/components/frames/layout')

export default [
  {
    path: '/index',
    name: 'data',
    component: dataPage,
    meta: {
      auth: true,
      title: '控制台',
      icon: 'el-icon-share',
      notMenu: true,
      keepAlive: true,
    },
  },
  // 首页模板
  {
    path: '/template',
    name: 'template',
    component: Layout,
    redirect: '/template/list',
    meta: {
      auth: true,
      title: '模板管理',
      icon: 'el-icon-edit-outline',
      notMenu: true,
    },
    children: [
      {
        path: '/template/list',
        name: 'templateList',
        component: () => import('@/views/template/list'),
        meta: {
          title: '模板列表'
        }
      }, {
        path: '/template/detail',
        name: 'templateCreate',
        component: () => import('@/views/template/detail'),
        meta: {
          title: '创建模板'
        }
      }
    ]
  },
  // 商品的
  {
    path: '/goods',
    name: 'goods',
    component: Layout,
    redirect: '/goods/goodList',
    meta: {
      auth: true,
      title: '商品管理',
      icon: 'el-icon-edit-outline',
      notMenu: true,
    },
    children: [
      {
        path: '/goods/goodList',
        name: 'goodList',
        component: () => import('@/views/goods/goodList'),
        meta: {
          title: '商品列表'
        }
      }, {
        path: '/goods/goodDetail/:id',
        name: 'checkDetail',
        component: () => import('@/views/goods/goodDetail'),
        meta: {
          title: '商品详情'
        }
      }, {
        path: '/goods/goodCreate',
        name: 'checkDetail',
        component: () => import('@/views/goods/goodCreate'),
        meta: {
          title: '创建订单'
        }
      }
    ]
  },
  // 品牌的
  {
    path: '/brand',
    name: 'brand',
    component: Layout,
    redirect: '/brand/brandList',
    meta: {
      auth: true,
      title: '品牌管理',
      icon: 'el-icon-edit-outline',
      notMenu: true,
    },
    children: [
      {
        path: '/brand/brandList',
        name: 'brandList',
        component: () => import('@/views/brand/brandList'),
        meta: {
          title: '品牌列表'
        }
      }, {
        path: '/goods/brandDetail/:id',
        name: 'checkDetail',
        component: () => import('@/views/brand/brandDetail'),
        meta: {
          title: '品牌详情'
        }
      }, {
        path: '/goods/brandCreate',
        name: 'checkDetail',
        component: () => import('@/views/brand/brandCreate'),
        meta: {
          title: '创建品牌'
        }
      }
    ]
  },
  // 分类
  {
    path: '/category',
    name: 'category',
    component: Layout,
    redirect: '/category/categoryList',
    meta: {
      auth: true,
      title: '分类管理',
      icon: 'el-icon-edit-outline',
      notMenu: true,
    },
    children: [
      {
        path: '/category/categoryList',
        name: 'categoryList',
        component: () => import('@/views/category/categoryList'),
        meta: {
          title: '分类列表'
        }
      }, {
        path: '/category/categoryDetail/:id',
        name: 'checkDetail',
        component: () => import('@/views/category/categoryDetail'),
        meta: {
          title: '分类详情'
        }
      }, {
        path: '/category/categoryCreate',
        name: 'checkDetail',
        component: () => import('@/views/category/categoryCreate'),
        meta: {
          title: '创建分类'
        }
      }
    ]
  },
  // 订单
  {
    path: '/order',
    name: 'order',
    component: Layout,
    redirect: '/order/orderList',
    meta: {
      auth: true,
      title: '订单管理',
      icon: 'el-icon-edit-outline',
      notMenu: true,
    },
    children: [
      {
        path: '/order/orderList',
        name: 'categoryList',
        component: () => import('@/views/order/orderList'),
        meta: {
          title: '订单列表'
        }
      }, {
        path: '/order/orderDetail/:id',
        name: 'checkDetail',
        component: () => import('@/views/order/orderDetail'),
        meta: {
          title: '订单详情'
        }
      }
    ]
  },
  // 博主管理
  {
    path: '/user/blogger',
    name: 'blogger',
    component: Layout,
    redirect: '/user/blogger',
    meta: {
      auth: true,
      title: '博主列表',
      icon: 'el-icon-edit-outline',
      notMenu: true,
    },
    children: [
      {
        path: '/user/blogger',
        name: 'userBlogger',
        component: () => import('@/views/user/blogger'),
        meta: {
          title: '博主列表'
        }
      }
    ]
  },
  // 文章管理
  {
    path: '/article/articleList',
    name: 'articleList',
    component: Layout,
    redirect: '/article/articleList',
    meta: {
      auth: true,
      title: '文章管理',
      icon: 'el-icon-edit-outline',
      notMenu: true,
    },
    children: [
      {
        path: '/article/articleList',
        name: 'articleList',
        component: () => import('@/views/article/articleList'),
        meta: {
          title: '文章列表'
        }
      }, {
        path: '/article/articleCreate',
        name: 'articleCreate',
        component: () => import('@/views/article/articleCreate'),
        meta: {
          title: '创建文章'
        }
      }
    ]
  },
  // 海报管理
  {
    path: '/poster/list',
    name: 'posterList',
    component: Layout,
    redirect: '/poster/list',
    meta: {
      auth: true,
      title: '海报管理',
      icon: 'el-icon-edit-outline',
      notMenu: true,
    },
    children: [
      {
        path: '/poster/list',
        name: 'posterList',
        component: () => import('@/views/poster/list'),
        meta: {
          title: '海报列表'
        }
      }, {
        path: '/poster/detail',
        name: 'posterDetail',
        component: () => import('@/views/poster/detail'),
        meta: {
          title: '创建海报'
        }
      }
    ]
  },
]