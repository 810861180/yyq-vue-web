<template>
  <div class="rank-details">
    <div class="left">
      <!-- <div class="time">
          <span>数据更新时间</span>
          <span>2023213123</span>
      </div> -->
      <div class="head-name">商品信息</div>
      <div class="left-header">
        <el-image style="width: 80px; height: 80px;" :src="leftData.image"></el-image>
        <div style="margin-left: 12px;">
          <div class="vertical" style="font-weight: bold; font-size: 14px;">{{ leftData.title }}</div>
<!--          <div style="color: #606266">当前在售商品数：{{ leftData.onSellGoodsCount }}</div>-->

        </div>
      </div>
      <el-card class="box-card">
        <div class="left-data">
          <div class="item">
            <div class="value value-orange">￥{{ leftData.price | tablefilter('centToyuan')}} </div>
            <div>价格</div>
          </div>
          <div class="item">
            <div class="value value-orange">￥{{ leftData.cosFee | tablefilter('centToyuan') }} <span>[{{leftData.cosFeeScale}}]</span></div>
            <div>预估佣金</div>
          </div>
          <div class="item">
            <div class="value value-pink">{{ leftData.platformSales | tablefilter('_toWan') }}</div>
            <div>全网销量</div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 20px;">
        <h3>带货转化</h3>
        <div class="left-data">
          <div class="item">
            <div>订单量</div>
            <div class="value">{{ $route.query.orderCount | toWan }}</div>
          </div>
          <div class="item">
            <div>转化率</div>
            <div class="value">￥{{ $route.query.conversionRate  }}</div>
          </div>
          <div class="item">
            <div>推广次数</div>
            <div class="value">￥{{ $route.query.promotionCount | toWan }}</div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 20px;">
        <h3>数据概况</h3>
        <div class="left-data">
          <div class="item">
            <div>关联直播场次</div>
            <div class="value">{{ leftData.userCount | tablefilter('yuanAndWan')  }}</div>
          </div>
          <div class="item">
            <div>关联达人</div>
            <div class="value">{{ leftData.userCount }}</div>
          </div>
          <div class="item">
            <div>关联视频</div>
            <div class="value">￥{{ leftData.userCount }}</div>
          </div>
        </div>
      </el-card>
      <div class="box-card">
        <h3>店铺信息</h3>
        <div style="display: flex;">
          <img :src="leftData.storeGoodsData.shop_logo " class="header-img50" style="margin-right: 12px;">
          <div>
            <div style="margin-top: 10px;">
              <span style="font-weight: bold;">{{ leftData.storeGoodsData.shop_name }}</span>
            </div>
            <div style="margin-top: 10px;">用户口碑：{{ leftData.storeGoodsData.dsr_info_logistics | toWan }}</div>
            <div style="margin-top: 10px;">发货速度：{{ leftData.storeGoodsData.dsr_info_logistics | toWan }}</div>
            <div style="margin-top: 10px;">服务态度：{{ leftData.storeGoodsData.dsr_info_logistics | toWan }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <el-card>
        <h3>流量趋势</h3>
        <div id="flowChart" style="width: 100%; height: 500px;"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import LiveApi from "@/api/liveApi";
  import * as echarts from 'echarts';
  import {toDate} from './config';

  export default {
    data() {
      return {
        leftData: {},
        flowChartData: {data: [], data2: []},
      }
    },
    mounted() {
      this.getLiveProductDetailLeftInfo();
      // this.getLiveProductDetailTopTotalCount();
      // this.flowChart();
    },
    methods: {
      getLiveProductDetailLeftInfo() {
        LiveApi.getLiveProductDetailLeftInfo({goodId: this.$route.query.goodsId}).then(res => {
          this.leftData = res.data;
        })
      },
      getLiveProductDetailTopTotalCount() {
        LiveApi.getLiveProductDetailTopTotalCount({goodId: this.$route.query.goodsId}).then(res => {
          const arrs = {
            data: [],
            data2: []
          }
          console.log(res.data)
          for (const key in res.data) {
            arrs.data.push([toDate(key), Number(res.data[key].enterCount)]);
            arrs.data2.push([toDate(key), Number(res.data[key].currentUserCount)]);
          }
          this.flowChartData = arrs;
          this.flowChart();
        })
      },
      flowChart() {
        var chartDom = document.getElementById('flowChart');
        var myChart = echarts.init(chartDom);
        var option;

        let data = this.flowChartData.data;
        let data2 = this.flowChartData.data2;
        option = {
          // title: {
          //     left: 'center',
          //     text: 'Tootip and dataZoom on Mobile Device'
          // },
          legend: {
            left: 'right',
            data: ['进场人数', '在线人数']
          },
          tooltip: {
            triggerOn: 'none',
            position: function (pt) {
              return [pt[0], 130];
            }
          },
          // toolbox: {
          //     left: 'center',
          //     itemSize: 25,
          //     top: 55,
          //     feature: {
          //     dataZoom: {
          //         yAxisIndex: 'none'
          //     },
          //     restore: {}
          //     }
          // },
          xAxis: {
            type: 'time',
            axisPointer: {
              value: '2016-10-7',
              snap: true,
              lineStyle: {
                color: '#7581BD',
                width: 2
              },
              label: {
                show: true,
                formatter: function (params) {
                  return echarts.format.formatTime('yyyy-MM-dd hh:mm', params.value);
                },
                backgroundColor: '#7581BD'
              },
              handle: {
                show: true,
                color: '#7581BD'
              }
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            axisTick: {
              inside: true
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              inside: true,
              formatter: '{value}\n'
            },
            z: 10
          },
          grid: {
            top: 110,
            left: 15,
            right: 15,
            height: 160
          },
          dataZoom: [
            {
              type: 'inside',
              throttle: 50
            }
          ],
          series: [
            {
              name: '进场人数',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              sampling: 'average',
              itemStyle: {
                color: '#0770FF'
              },
              stack: 'a',
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(58,77,233,0.8)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(58,77,233,0.3)'
                  }
                ])
              },
              data: data
            },
            {
              name: '在线人数',
              type: 'line',
              smooth: true,
              stack: 'a',
              symbol: 'circle',
              symbolSize: 5,
              sampling: 'average',
              itemStyle: {
                color: '#F2597F'
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(213,72,120,0.8)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(213,72,120,0.3)'
                  }
                ])
              },
              data: data2
            }
          ]
        };

        option && myChart.setOption(option);

      }
    }
  }
</script>

<style lang="scss" scoped>
  .rank-details {
    padding: 20px;
    display: flex;
    font-size: 12px;

    .left {
      width: 370px;
      border: 1px solid #DCDFE6;
      border-radius: 10px;
      overflow: hidden;
      box-sizing: border-box;
      padding: 20px 0;

      .time {
        background: #909399;
        text-align: center;
        height: 24px;
        line-height: 24px;
        width: 100%;
      }

      .left-header {
        display: flex;
        align-items: center;
        width: 90%;
        margin: 0 auto;
        margin-bottom: 10px;
      }

      .divder {
        width: 100%;
        height: 1px;
        box-sizing: border-box;
        border-top: 1px dashed #DCDFE6;
        margin: 20px 0;
      }

      .box-card {
        width: 90%;
        margin: 0 auto;
      }

      .left-data {
        display: flex;
        flex-wrap: wrap;

        .item {
          width: 33%;
          margin-bottom: 20px;
        }

        .value {
          margin-top: 8px;
          font-weight: bold;
          font-size: 17px;
        }

        .value-orange {
          color: orangered;
        }
      }
    }

    .right {
      flex: 1;
      margin-left: 20px;
    }
  }

  .head-name {
    margin-left: 20px;
    margin-bottom: 15px;
    font-weight: bold;
    font-family: "黑体";
    font-size: 15px;
  }
</style>
