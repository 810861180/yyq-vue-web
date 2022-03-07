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
        <div class="left-data left-data2">
          <div class="item2">
            <div style="width: 100px;">价格</div>
            <div class="value value-orange">￥{{ leftData.price | tablefilter('centToyuan')}} </div>

          </div>
          <div class="item2">
            <div style="width: 100px;">预估佣金</div>
            <div class="value value-orange">
              <span>￥{{ leftData.cosFee | tablefilter('centToyuan') }} </span>
              <span style="font-size: 12px; color: black">[{{leftData.cosFeeScale | tablefilter('percent')}}]</span>
            </div>
          </div>
          <div class="item2">
            <div style="width: 100px;">全网销量</div>
            <div class="value value-pink" style="padding-left: 5px;">{{ leftData.platformSales | tablefilter('toWan') }}</div>
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
            <div class="value">{{ $route.query.conversionRate | filters1 }}</div>
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
            <div class="value">{{ leftData.liveCount | toWan  }}</div>
          </div>
          <div class="item">
            <div>关联达人</div>
            <div class="value">{{ leftData.userCount }}</div>
          </div>
          <div class="item">
            <div>关联视频</div>
            <div class="value">{{ leftData.videoCount }}</div>
          </div>
        </div>
      </el-card>
      <div class="box-card">
        <h3>店铺信息</h3>
        <div style="display: flex;">
          <img :src="leftData.storeGoodsData.shop_logo" class="header-img" style="margin-right: 12px;">
          <div>
            <div style="margin-top: 10px;">
              <span style="font-weight: bold;">{{ leftData.storeGoodsData.shop_name }}</span>
            </div>
            <div style="display: flex; margin-top: 8px;">
              <div style="margin-right: 10px;">
                <div style="text-align: center;color: red;font-weight: bold;">{{ leftData.storeGoodsData.dsr_info_public_praise }}</div>
                <div>用户口碑</div>
              </div>
              <div style="margin-right: 10px;">
                <div style="text-align: center;color: red;font-weight: bold;">{{ leftData.storeGoodsData.dsr_info_logistics }}</div>
                <div>发货速度</div>
              </div>
              <div>
                <div style="text-align: center; color: red;font-weight: bold;">{{ leftData.storeGoodsData.dsr_info_service }}</div>
                <div>服务态度</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <el-card>
        <h3>新增数据</h3>
        <div style="display: flex;justify-content: space-between; padding: 0 10%; font-size: 16px;line-height: 28px;text-align: center;">
          <div>
            <div>全网销量增量</div>
            <div style="font-size: 24px;font-weight: bold;">{{newData.saleCount | toWan   }}</div>
          </div>
          <div>
            <div>浏览量</div>
            <div style="font-size: 24px;font-weight: bold;">{{ newData.viewCount | toWan  }}</div>
          </div>
          <div>
            <div>关联达人</div>
            <div style="font-size: 24px;font-weight: bold;">{{ newData.userCount }}</div>
          </div>
          <div>
            <div>关联直播场次</div>
            <div style="font-size: 24px;font-weight: bold;">{{ newData.liveCount }}</div>
          </div>
          <div>
            <div>关联视频</div>
            <div style="font-size: 24px;font-weight: bold;">{{ newData.videoCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="charts">
          <div class="item">
            <h3>平台数据</h3>
            <div class="item-chart" id="productOrderAccount"></div>
          </div>
          <div class="item">
            <h3>推广次数趋势图</h3>
            <div class="item-chart" id="promotionUserAccount"></div>
          </div>
          <div class="item">
            <h3>全网销量数据</h3>
            <div class="item-chart" id="sales"></div>
          </div>
          <div class="item">
            <h3>每日关联视频/直播数</h3>
            <div class="item-chart" id="videoCount"></div>
          </div>
        </div>
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
        leftData: {storeGoodsData: {}},
        newData: {},
        charts: {
          productOrderAccount: [],
          promotionUserAccount: [],
          pv: []
        },
        countData: {
          liveCount: [],
          sales: [],
          videoCount: []
        }
      }
    },
    filters: {
      filters1(val) {
        if(!val) return ''
        return `${(Number(val) * 100).toFixed(1)}%`;
      }
    },
    mounted() {
      this.getLiveProductDetailLeftInfo();
      this.getLiveProductDetailTopTotalCount();
      this.getLiveProductDetailDownTotalCount();
      this.getLiveProductDetailNewData();

    },
    methods: {
      getLiveProductDetailLeftInfo() {
        LiveApi.getLiveProductDetailLeftInfo({goodId: this.$route.query.goodsId}).then(res => {
          this.leftData = res.data;
        })
      },
      getLiveProductDetailNewData() {
        LiveApi.getLiveProductDetailNewData({goodId: this.$route.query.goodsId}).then(res => {
          this.newData = res.data;
        })
      },
      getLiveProductDetailTopTotalCount() {
        LiveApi.getLiveProductDetailTopTotalCount({goodId: this.$route.query.goodsId}).then(res => {
          for (const key in res.data) {
            for (let item in this.charts) {
              this.charts[item].push([ toDate(key, true), Number(res.data[key][item]) ]);
            }
          }
          this.allChart('productOrderAccount', this.charts.productOrderAccount, this.charts.pv);
          this.promotionChart()
        })
      },
      getLiveProductDetailDownTotalCount() {
        LiveApi.getLiveProductDetailDownTotalCount({goodId: this.$route.query.goodsId}).then(res => {
          for (const key in res.data) {
            for (let item in this.countData) {
              this.countData[item].push([ toDate(key, true), Number(res.data[key][item]) ]);
            }
          }
          this.salesChart();
          this.videoCountChart()
        })
      },


      allChart(id, data, data2) {
        let chartDom = document.getElementById(id);
        let myChart = echarts.init(chartDom);
        let option;

        option = {
          legend: {
            data: ['平台订单量', '浏览量']
          },
          tooltip: {
            triggerOn: 'none',
            position: function (pt) {
              return [pt[0], 130];
            }
          },
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
              length: 10
            },
            axisPointer: {
              snap: true,
              lineStyle: {
                color: '#7581BD',
                width: 2
              },
              label: {
                show: true,
                formatter: function (params) {
                  return params.value
                },
                backgroundColor: '#7581BD'
              },
              handle: {
                show: true,
                color: '#7581BD'
              }
            },
            data: data.map(item => item[0]),
            splitLine: {
              show: false
            }
          },
          yAxis: [
            {
              type: 'value',
              name: '平台订单量',
              axisTick: {
                length: 6,
                lineStyle: {
                  type: 'dashed'
                }
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                inside: true,
                formatter: '{value}\n'
              }
            },
            {
              type: 'value',
              name: '浏览量',
              axisTick: {
                length: 6,
                lineStyle: {
                  type: 'dashed'
                }
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                inside: true,
                formatter: '{value}\n'
              }
            }
          ],
          grid: {
            top: 100,
            left: 35,
            right: 25,
            height: 200
          },
          dataZoom: [
            {
              type: 'inside',
              throttle: 50
            }
          ],
          series: [
            {
              name: '平台订单量',
              type: 'line',
              yAxisIndex: 0,
              smooth: true,
              itemStyle: {
                color: '#0770FF'
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(58,77,233,0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(58,77,233,0.1)'
                  }
                ])
              },
              data: data.map(item => item[1])
            },
            {
              name: '浏览量',
              type: 'line',
              yAxisIndex: 1,
              smooth: true,
              itemStyle: {
                color: '#F2597F'
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(213,72,120,0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(213,72,120,0.1)'
                  }
                ])
              },
              data: data2.map(item => item[1])
            }
          ]
        };
        option && myChart.setOption(option);

      },

      promotionChart() {
        let chartDom = document.getElementById('promotionUserAccount');
        let myChart = echarts.init(chartDom);
        let option;

        option = {
          xAxis: {
            type: 'category',
            data: this.charts.promotionUserAccount.map(item => item[0]),
            axisTick: {
              alignWithLabel: true,
            },
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: this.charts.promotionUserAccount.map(item => item[1]),
              type: 'line',
              smooth: true,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(213,72,120,0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(213,72,120,0.1)'
                  }
                ])
              },
            }
          ]
        };

        option && myChart.setOption(option);
      },

      salesChart() {
        let chartDom = document.getElementById('sales');
        let myChart = echarts.init(chartDom);
        let option;

        option = {
          legend: {
            data: ['销售量']
          },
          xAxis: {
            type: 'category',
            data: this.countData.sales.map(item => item[0]),
            axisTick: {
              alignWithLabel: true,
            },
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: this.countData.sales.map(item => item[1]),
              type: 'line',
              smooth: true
            }
          ]
        };

        option && myChart.setOption(option);
      },

      videoCountChart() {
        let chartDom = document.getElementById('videoCount');
        let myChart = echarts.init(chartDom);
        let option;

        option = {
          legend: {
            data: ['视频数', '直播数']
          },
          tooltip: {
            triggerOn: 'none',
            position: function (pt) {
              return [pt[0], 130];
            }
          },
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
              length: 10
            },
            axisPointer: {
              snap: true,
              lineStyle: {
                color: '#7581BD',
                width: 2
              },
              label: {
                show: true,
                formatter: function (params) {
                  return params.value
                },
                backgroundColor: '#7581BD'
              },
              handle: {
                show: true,
                color: '#7581BD'
              }
            },
            data: this.countData.videoCount.map(item => item[0]),
            splitLine: {
              show: false
            }
          },
          yAxis: [
            {
              type: 'value',
              name: '视频数',
              axisTick: {
                length: 6,
                lineStyle: {
                  type: 'dashed'
                }
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                inside: true,
                formatter: '{value}\n'
              }
            },
            {
              type: 'value',
              name: '直播数',
              axisTick: {
                length: 6,
                lineStyle: {
                  type: 'dashed'
                }
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                inside: true,
                formatter: '{value}\n'
              }
            }
          ],
          grid: {
            top: 100,
            left: 35,
            right: 25,
            height: 200
          },
          dataZoom: [
            {
              type: 'inside',
              throttle: 50
            }
          ],
          series: [
            {
              name: '视频数',
              type: 'bar',
              yAxisIndex: 0,
              smooth: true,
              itemStyle: {
                color: '#0770FF'
              },
              data: this.countData.videoCount.map(item => item[1])
            },
            {
              name: '直播数',
              type: 'bar',
              yAxisIndex: 1,
              smooth: true,
              itemStyle: {
                color: '#F2597F'
              },
              data: this.countData.liveCount.map(item => item[1])
            }
          ]
        };
        option && myChart.setOption(option);

      },
    }
  }
</script>

<style lang="scss" scoped>
  .rank-details {
    padding: 20px;
    padding-right: 8px;
    display: flex;
    font-size: 12px;
    max-height: 100vh;
    .left {
      width: 370px;
      border: 1px solid #DCDFE6;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 20px 0;
      max-height: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 4px;    
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px white;
        background: white;
      }
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
        .item2 {
          display: flex;
          align-items: center;
          margin-top: 8px;
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
      .left-data2{
        display: block;
        font-weight: bold;
        .value{
          margin-top: 0;
        }
      }
    }

    .right {
      flex: 1;
      margin-left: 20px;
      overflow: auto;
      padding-right: 12px;
      &::-webkit-scrollbar {
        width: 4px;    
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
      }
      &::-webkit-scrollbar-track {
        // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        // background: rgba(0,0,0,0.1);
      }
      .charts{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item{
          width: 48%;
          height: 440px;
          margin-bottom: 20px;
          .item-chart{
            width: 100%;
            height: 380px;
          }
        }
      }
    }
  }

  .head-name {
    margin-left: 20px;
    margin-bottom: 15px;
    font-weight: bold;
    font-family: "黑体";
    font-size: 15px;
  }
  .header-img{
    height: 64px;
    width: 64px;

  }
</style>
