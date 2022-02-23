export const recordColumn = [
    {prop: 'content',  label: '直播内容', slotName: 'content', width: '270'},
    {prop: 'createTime',  label: '开播时间', NumConfig: {filterName: 'toDate'}},
    {prop: 'duringTime',  label: '直播时长', NumConfig: {filterName: 'toTime'}},
    {prop: 'lastSalesGrow',  label: '销量', NumConfig: {filterName: 'toWan'} },
    {prop: 'lastSalesPrice',  label: '销售额', NumConfig: {filterName: 'yuanAndWan', unit: '￥'} },
    {prop: 'op',  label: '操作', slotName: 'op'}
]

export const toDate = (value, type) => {
  let date = new Date(parseInt(value)).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ').replace(/\//g, '-');
  if (!type) return date;
  date = date.split(' ')[1].split(':');
  date = `${date[0]}:${date[1]}`;
  return date;
}
