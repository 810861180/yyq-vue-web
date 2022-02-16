export const recordColumn = [
    {prop: 'content',  label: '直播内容', slotName: 'content', width: '270'},
    {prop: 'createTime',  label: '开播时间', NumConfig: {filterName: 'toDate'}},
    {prop: 'duringTime',  label: '直播时长', NumConfig: {filterName: 'toTime'}},
    {prop: 'lastSalesGrow',  label: '销量', NumConfig: {filterName: 'toWan'} },
    {prop: 'lastSalesPrice',  label: '销售额', NumConfig: {filterName: 'yuanAndWan', unit: '￥'} },
    {prop: 'op',  label: '操作', slotName: 'op'}
]