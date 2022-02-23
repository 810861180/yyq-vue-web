export const rankColumn = [
  {prop: 'rank', label: '排名', slotName: 'rank', width: '170', align: 'center'},
  {prop: 'product', label: '商品', slotName: 'product', width: '270'},
  {prop: 'todayProductOrderAccount', label: '日订单量', NumConfig: {filterName: 'toWan'}},
  {prop: 'totalProductOrderAccount', label: '30天订单量', NumConfig: {filterName: 'toWan'}},
  {prop: 'totalPromotionUserAccount', label: '推广次数'},
  {prop: 'conversionRate', label: '30天转化', NumConfig: {filterName: 'percent'}},
  {prop: 'cosFeeScale', label: '佣金比', NumConfig: {filterName: 'percent'}},
  {prop: 'todayPv', label: '日浏览', NumConfig: {filterName: 'toWan'}},
  {prop: 'totalPv', label: '30天浏览', NumConfig: {filterName: 'toWan'}},
  {prop: 'op', label: '操作', slotName: 'op'}
]

export const toDate = (value) => {
  return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ').replace(/\//g, '-');
}
