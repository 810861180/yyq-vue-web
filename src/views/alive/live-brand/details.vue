<template>
  <div class="rank-details">
    <div class="left">
      <!-- <div class="time">
          <span>数据更新时间</span>
          <span>2023213123</span>
      </div> -->
      <div class="head-name">小店信息</div>
      <div class="left-header">
        <el-image style="width: 80px; height: 80px;" class="header-img50" :src="leftData.shopLogo"></el-image>
        <div style="margin-left: 12px;">
          <div class="vertical" style="font-weight: bold; font-size: 14px;">{{ leftData.shopName }}</div>
          <div style="color: #606266">当前在售商品数：{{ leftData.onSellGoodsCount }}</div>
          <div>
            <el-tag size="mini" v-for="item in JSON.parse($route.query.cids)" :key="item">{{ [item] |
              tablefilter('cids') }}
            </el-tag>
          </div>

        </div>
      </div>
      <el-card class="box-card">
        <div class="left-data">
          <div class="item">
            <div class="value value-pink">{{ leftData.dsrInfoPublicPraise}}</div>
            <div>用户口碑</div>
          </div>
          <div class="item">
            <div class="value value-pink">{{ leftData.dsrInfoLogistics }}</div>
            <div>发货速度</div>
          </div>
          <div class="item">
            <div class="value value-pink">{{ leftData.dsrInfoLogistics }}</div>
            <div>服务态度</div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 20px;">
        <h3>带货转化</h3>
        <div class="left-data">
          <div class="item">
            <div>销量</div>
            <div class="value">{{ leftData.sellNum | toWan }}</div>
          </div>
          <div class="item">
            <div>销售额</div>
            <div class="value">￥{{ leftData.sellPrice | tablefilter('yuanAndWan') }}</div>
          </div>
        </div>
        <div class="divder" style="margin: -12px 0 12px 0;"></div>
        <div class="left-data">
          <div class="item">
            <div>推广商品</div>
            <div class="value">{{ leftData.goodsCount  }}</div>
          </div>
          <div class="item">
            <div>佣金比例</div>
            <div class="value">{{ leftData.cosFeeRate | tablefilter('percent')}}</div>
          </div>
          <div class="item">
            <div>客单价</div>
            <div class="value">￥{{ leftData.perCustomerPrice | tablefilter('centToyuan')}}</div>
          </div>
        </div>
        <div class="divder" style="margin: -12px 0 12px 0;"></div>
        <div class="left-data">
          <div class="item">
            <div>带货视频</div>
            <div class="value">￥{{ leftData.videoCount  }}</div>
          </div>
          <div class="item">
            <div>带货直播</div>
            <div class="value">{{ leftData.liveCount }}</div>
          </div>
          <div class="item">
            <div>带货达人</div>
            <div class="value">{{ leftData.userCount }}</div>
          </div>
        </div>
      </el-card>
      <div class="box-card">
        <h3>绑定达人</h3>
        <div style="display: flex;">
          <img :src="leftData.simpleDto[0].avatar_larger " class="header-img50" style="margin-right: 12px;">
          <div>
            <div style="margin-top: 10px;">
              <span style="font-weight: bold;">{{ leftData.simpleDto[0].nickname }}</span>
            </div>
            <div style="margin-top: 10px;">粉丝数：{{ leftData.simpleDto[0].follower_count | toWan }}</div>
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
      this.getLiveBrandDetailLeftInfo();
      this.getLiveHotRoomDetailTotalCount();
      this.flowChart();
    },
    methods: {
      getLiveBrandDetailLeftInfo() {
        LiveApi.getLiveBrandDetailLeftInfo({userId: this.$route.query.userId}).then(res => {
          this.leftData = res.data;
        })
      },
      LiveBrandDetailNewData() {
        LiveApi.LiveBrandDetailNewData({userId: this.$route.query.userId}).then(res => {
          this.newData = res.data;
        })
      },
      getLiveHotRoomDetailTotalCount() {
        LiveApi.getLiveHotRoomDetailTotalCount({liveId: this.$route.query.userId}).then(res => {
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

        .value-pink {
          color: #db396c;
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
  }
</style>
