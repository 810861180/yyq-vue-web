// 全局过滤器*****************************
// 转化为万为单位 方法
const _toWan = (value) => {
  if (value < 10000) return value
  return `${(value / 10000).toFixed(1)}w`;
}
// 转化分为万为单位 方法
const _toWan1 = (value) => {
  if (value < 1000000) return value
  return `${(value / 1000000).toFixed(1)}w`;
}
// 分转元
const centToyuan = (value) => {
  return (value / 100).toFixed(2);
}
// 百分比转换 0.484848-->48.48%
const percent = (value) => {
  if (value >= 1) {
    return 100.00 + "%";
  }
  return (value * 100).toFixed(2) + "%";
}
// 增量显示
const rankingIncrement = (value) => {
  console.log(value)
  if (value >= 1) {
    return "▲" + value;
  } else if(value < 0){
    return "▼" + -value;
  }
}
// 时间戳转日期
const _toDate = (value) => {
  return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ').replace(/\//g, '-');
}
// 毫秒转化为时分秒
const formatSeconds = (value) => {
  var theTime = parseInt(value) / 1000;// 秒
  var theTime1 = 0;// 分
  var theTime2 = 0;// 小时
  // alert(theTime);
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    // alert(theTime1+"-"+theTime);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  var result = "" + parseInt(theTime) + "秒";
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1) + "分" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + "小时" + result;
  }
  return result;
}

// 类目表示转换
const cids = (arr) => {
  const data = {
    c1: '手机数码',
    c3: '服装饰品',
    c4: '美妆个护',
    c5: '运动户外',
    c6: '电脑办公',
    c7: '食品百货',
    c8: '母婴玩具',
    c9: '鞋靴箱包',
    c11: '生活厨具',
    c12: '家用电器',
    c13: '图书文娱'
  }
  const val = arr.map(item => data[item]).join(',');
  return val;
}

// 时间戳转日期
export const toDate = (value) => {
  if (!value) return ''
  return _toDate(value)
}
// 转化为万为单位
export const toWan = (value) => {
  if (!value) return ''
  return _toWan(value);
}
// 千分位
export const toThousands = (value) => {
  if (!value) return ''
  return parseFloat(value).toLocaleString();
}
// 表格专用过滤器 需要传递name
export const tablefilter = (value, name, replace) => {
  if (!value && (name !== 'replace')) return ''
  // 替换
  if (name === 'replace') return replace;
  if (name === 'toWan') return _toWan(value);
  if (name === 'centToyuan') return centToyuan(value);
  if (name === 'yuanAndWan') return _toWan(centToyuan(value));
  if (name === 'toDate') return _toDate(value);
  if (name === 'toTime') return formatSeconds(value);
  if (name === 'cids') return cids(value);
  if (name === 'rankingIncrement') return rankingIncrement(value);
  if (name === 'percent') return percent(value);
  if (name === '_toWan1') return _toWan1(value);
  return value;
}
