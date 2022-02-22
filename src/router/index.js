import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '工作台', icon: 'home'}
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/data-screen',
    name: 'dataScreen',
    meta: {title: '数据大屏', icon: 'product'},
    component: () => import('@/views/alive/live-real/data-screen')
  },
  {
    path: '/addProductCate',
    name: 'windmill-live',
    component: () => import('@/views/alive/sale-rank/details'),
    meta: {title: '直播风车榜'}
  },
  {
    path: '/productCate',
    name: 'drainage-live',
    component: () => import('@/views/alive/broadcast-room/details'),
    meta: {title: '直播引流榜', icon: 'product-cate'}
  },
  {
    path: '/updateProductCate',
    name: 'search-live',
    component: () => import('@/views/alive/live-brand/details'),
    meta: {title: '直播搜索'},
    hidden: true
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'live',
    meta: {title: '直播', icon: 'product'},
    children: [
      {
        path: 'product',
        name: 'real-live',
        component: () => import('@/views/alive/live-real/index'),
        meta: {title: '实时直播榜', icon: 'product-list'}
      },
      {
        path: 'addProduct',
        name: 'hot-live',
        component: () => import('@/views/alive/broadcast-room/index'),
        meta: {title: '爆款直播间', icon: 'product-add'}
      },
      {
        path: 'updateProduct',
        name: 'sale-live',
        component: () => import('@/views/alive/sale-rank/index'),
        meta: {title: '直播带货榜', icon: 'product-add'},
        hidden: true
      },
      // {
      //   path: 'addProductCate',
      //   name: 'windmill-live',
      //   component: () => import('@/views/pms/productCate/add'),
      //   meta: {title: '直播风车榜'},
      //   hidden: true
      // },
      {
        path: 'productAttr',
        name: 'brand-live',
        component: () => import('@/views/alive/live-brand/index'),
        meta: {title: '品牌自播榜', icon: 'product-attr'}
      },
      {
        path: 'productAttrList',
        name: 'study-live',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: {title: '学浪榜单'},
        hidden: true
      },
      {
        path: 'addProductAttr',
        name: 'addProductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: {title: '添加商品属性'},
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: {title: '修改商品属性'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta: {title: '品牌管理', icon: 'product-brand'}
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {title: '添加品牌'},
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {title: '编辑品牌'},
        hidden: true
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'e-commerce',
    meta: {title: '电商', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'hot-product',
        component: () => import('@/views/alive/hot-product/index'),
        meta: {title: '热门商品榜', icon: 'product-list'}
      },
      {
        path: 'orderDetail',
        name: 'sale-video',
        component: () => import('@/views/alive/rise-example/index'),
        meta: {title: '飙升视频榜'},
        hidden: true
      },
      {
        path: 'deliverOrderList',
        name: 'e-commerce-expert',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {title: '电商达人榜'},
        hidden: true
      },
      {
        path: 'orderSetting',
        name: 'shop-list',
        component: () => import('@/views/oms/order/setting'),
        meta: {title: '小店库', icon: 'order-setting'}
      },
      {
        path: 'returnApply',
        name: 'rank-shop',
        component: () => import('@/views/oms/apply/index'),
        meta: {title: '小店排行榜', icon: 'order-return'}
      },
      {
        path: 'returnReason',
        name: 'search-product',
        component: () => import('@/views/oms/apply/reason'),
        meta: {title: '商品搜索', icon: 'order-return-reason'}
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: {title: '退货原因详情'},
        hidden: true
      }
    ]
  },
  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'expert',
    meta: {title: '达人', icon: 'sms'},
    children: [
      {
        path: 'flash',
        name: 'expert-list',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '达人榜', icon: 'sms-flash'}
      },
      {
        path: 'flashSession',
        name: 'mcn',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {title: 'MCN机构'},
        hidden: true
      },
      {
        path: 'selectSession',
        name: 'search-expert',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {title: '达人搜索榜'},
        hidden: true
      },
      {
        path: 'flashProductRelation',
        name: 'flashProductRelation',
        component: () => import('@/views/sms/flash/productRelationList'),
        meta: {title: '秒杀商品列表'},
        hidden: true
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {title: '优惠券列表', icon: 'sms-coupon'}
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {title: '添加优惠券'},
        hidden: true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {title: '修改优惠券'},
        hidden: true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: {title: '优惠券领取详情'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'homeBrand',
        component: () => import('@/views/sms/brand/index'),
        meta: {title: '品牌推荐', icon: 'product-brand'}
      },
      {
        path: 'new',
        name: 'homeNew',
        component: () => import('@/views/sms/new/index'),
        meta: {title: '新品推荐', icon: 'sms-new'}
      },
      {
        path: 'hot',
        name: 'homeHot',
        component: () => import('@/views/sms/hot/index'),
        meta: {title: '人气推荐', icon: 'sms-hot'}
      },
      {
        path: 'subject',
        name: 'homeSubject',
        component: () => import('@/views/sms/subject/index'),
        meta: {title: '专题推荐', icon: 'sms-subject'}
      },
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/sms/advertise/index'),
        meta: {title: '广告列表', icon: 'sms-ad'}
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: {title: '添加广告'},
        hidden: true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: {title: '编辑广告'},
        hidden: true
      }
    ]
  },
  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: '权限', icon: 'ums'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {title: '角色列表', icon: 'ums-role'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: {title: '分配菜单'},
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/ums/role/allocResource'),
        meta: {title: '分配资源'},
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {title: '菜单列表', icon: 'ums-menu'}
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/ums/menu/add'),
        meta: {title: '添加菜单'},
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/ums/menu/update'),
        meta: {title: '修改菜单'},
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/ums/resource/index'),
        meta: {title: '资源列表', icon: 'ums-resource'}
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList'),
        meta: {title: '资源分类'},
        hidden: true
      }
    ]
  },
  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'video',
    meta: {title: '短视频', icon: 'sms'},
    children: [
      {
        path: 'flash',
        name: 'video-list',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '视频榜', icon: 'sms-flash'}
      },
      {
        path: 'flashSession',
        name: 'video-component',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {title: '视频组件榜'},
        hidden: true
      },
      {
        path: 'selectSession',
        name: 'hot-topic',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {title: '热门话题'},
        hidden: true
      }
    ]
  },
  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'brand',
    meta: {title: '品牌', icon: 'sms'},
    children: [
      {
        path: 'flash',
        name: 'brand-list',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '品牌库', icon: 'sms-flash'}
      },
      {
        path: 'flashSession',
        name: 'brand-rank',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {title: '品牌排行榜'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

