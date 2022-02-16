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
const toDate = (value) => {
  return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ').replace(/\//g, '-');
}
// 毫秒转化为时分秒
const formatSeconds = (value) => {
  var theTime = parseInt(value) / 1000;// 秒
  var theTime1 = 0;// 分
  var theTime2 = 0;// 小时
  // alert(theTime);
  if(theTime > 60) {
    theTime1 = parseInt(theTime/60);
    theTime = parseInt(theTime%60);
    // alert(theTime1+"-"+theTime);
    if(theTime1 > 60) {
      theTime2 = parseInt(theTime1/60);
      theTime1 = parseInt(theTime1%60);
    }
  }
  var result = ""+parseInt(theTime)+"秒";
  if(theTime1 > 0) {
    result = ""+parseInt(theTime1)+"分"+result;
  }
  if(theTime2 > 0) {
    result = ""+parseInt(theTime2)+"小时"+result;
  }
  return result;
}

// 时间戳转日期
Vue.filter('toDate', value => {
  if (!value) return ''
  return toDate(value)
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
  if (name === 'toDate') return toDate(value);
  if (name === 'toTime') return formatSeconds(value);
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
