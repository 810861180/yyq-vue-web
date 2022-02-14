export const salesColumn = [
    {prop: 'ranking',  label: '排名', width: '70'},
    {prop: 'live',  label: '直播', slotName: 'live', width: '400'},
    {prop: 'intelligent',  label: '达人', slotName: 'intelligent', width: '400'},
    {prop: 'currentUserCount',  label: '当前在线人数', NumConfig: {filterName: 'toWan'} },
    {prop: 'likeCount',  label: '获得点赞数', NumConfig: {filterName: 'toWan'} },
    {prop: 'platformSalesCount',  label: '累计销量', NumConfig: {filterName: 'toWan'} },
    {prop: 'lastSalesPrice',  label: '预估销售额', NumConfig: {filterName: 'toWan', unit: '￥', style: {color: 'gold'}} },
    {prop: 'op',  label: '操作', slotName: 'op'}
]
export const realColumn = [
    {prop: 'ranking',  label: '排名', width: '70'},
    {prop: 'live',  label: '直播', slotName: 'live', width: '400'},
    {prop: 'intelligent',  label: '达人', slotName: 'intelligent', width: '400'},
    {prop: 'currentUserCount',  label: '当前在线人数', NumConfig: {filterName: 'toWan'} },
    {prop: 'likeCount',  label: '获得点赞数', NumConfig: {filterName: 'toWan'} },
    {prop: 'platformSalesCount',  label: '累计销量', NumConfig: {filterName: 'replace', replace: '未带货'} },
    {prop: 'lastSalesPrice',  label: '预估销售额', NumConfig: {filterName: 'replace', replace: '未带货'} },
    {prop: 'op',  label: '操作', slotName: 'op'}
]

export const screenColumn = [
    {prop: 'commodity',  label: '商品', slotName: 'commodity', width: '300'},
    {prop: 'price',  label: '直播价（元）', NumConfig: {filterName: 'centToyuan', unit: '￥'}},
    {prop: 'cosfee',  label: '佣金', NumConfig: {filterName: 'centToyuan', unit: '￥'}},
    {prop: 'inserttime',  label: '商品上架时间', slotName: 'time' },
    {prop: 'computedsales',  label: '预估销量', NumConfig: {filterName: 'toWan'}},
    {prop: 'lastsalesprice',  label: '预估销售额', NumConfig: {filterName: 'yuanAndWan', unit: '￥'} }
]