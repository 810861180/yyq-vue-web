import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

// 全局过滤器*****************************
// 转化为万为单位 方法
const toWan = (value) => {
  if (value < 10000) return value
  return `${(value / 10000).toFixed(1)}w`;
}
// 分转元
const centToyuan = (value) => {
  return (value / 100).toFixed(2);
}
// 时间戳转日期
Vue.filter('toDate', value => {
  if (!value) return ''
  return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ').replace(/\//g, '-');
})
// 转化为万为单位
Vue.filter('toWan', value => {
  if (!value) return ''
  return toWan(value);
})
// 千分位
Vue.filter('toThousands', value => {
  if (!value) return ''
  return parseFloat(value).toLocaleString();
})
// 表格专用过滤器 需要传递name
Vue.filter('tablefilter', (value, name, replace) => {
  if (!value && (name !== 'replace')) return ''
  // 替换
  if (name === 'replace') return replace;
  if (name === 'toWan') return toWan(value);
  if (name === 'centToyuan') return centToyuan(value);
  if (name === 'yuanAndWan') return toWan(centToyuan(value));
  return value;
})
// 全局过滤器*****************************
Vue.use(ElementUI, { locale })
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
