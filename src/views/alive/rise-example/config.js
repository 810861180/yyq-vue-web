export const toDate = (value) => {
  return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ').replace(/\//g, '-');
}

export const rankColumn = [
  {prop: 'time', label: '数据更新时间'},
  {prop: 'increase_goodValue', label: '点赞增量', NumConfig: {filterName: 'toWan'}},
  {prop: 'goodValue', label: '点赞总量', NumConfig: {filterName: 'toWan'}},
  {prop: 'increase_commentValue', label: '评论增量', NumConfig: {filterName: 'toWan'}},
  {prop: 'commentValue', label: '评论总量', NumConfig: {filterName: 'toWan'}},
  {prop: 'increase_shareValue', label: '分享增量', NumConfig: {filterName: 'toWan'}},
  {prop: 'shareValue', label: '分享总量', NumConfig: {filterName: 'toWan'}}
]