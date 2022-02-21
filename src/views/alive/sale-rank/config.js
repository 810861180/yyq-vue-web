export const rankColumn = [
  {prop: 'ranking', align: 'center', label: '排名', width: '70'},
  {prop: 'live', label: '开播时间', slotName: 'live', width: '300'},
  {prop: 'user', label: '达人', slotName: 'user', width: '360'},
  {
    prop: 'hotCids', label: '热销类目', NumConfig: {
      filterName: 'cids', style: {
        fontSize: '12px', fontWeight: 400, lineHeight: '16px'
      }
    }
  },
  {prop: 'maxUserCount', label: '最高观看', NumConfig: {filterName: 'toWan'}},
  {prop: 'followerGrow', label: '粉丝变化', NumConfig: {filterName: 'toWan'}},
  {prop: 'lastSalesGrow', label: '直播销量', NumConfig: {filterName: 'toWan'}},
  {prop: 'lastSalesPrice', label: '直播销售额', NumConfig: {filterName: 'yuanAndWan'}},
  {prop: 'op', label: '操作', slotName: 'op'}
]

export const toDate = (value) => {
  return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ').replace(/\//g, '-');
}
