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

export const toDate = (value, type) => {
  let date = new Date(parseInt(value)).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ').replace(/\//g, '-');
  if (!type) return date;
  date = date.split(' ')[0].split('-');
  date = `${date[1]}-${date[2]}`;
  return date;
}
