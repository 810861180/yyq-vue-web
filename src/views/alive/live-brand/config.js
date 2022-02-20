export const rankColumn = [
  {prop: 'ranking', align: 'center', label: '排名', width: '70'},
  {prop: 'user', label: '达人', slotName: 'user', width: '500'},
  {prop: 'liveCountNow', label: '直播场次'},
  {prop: 'lastSalesGrow', label: '销量'},
  {prop: 'lastSalesPrice', label: '预估销售额', NumConfig: {filterName: '_toWan1'}},
  {
    prop: 'hotCids', label: '品类', NumConfig: {
      filterName: 'cids', style: {
        fontSize: '12px', fontWeight: 400, lineHeight: '16px'
      }
    }
  },
  {prop: 'op', label: '操作', slotName: 'op'}
]
