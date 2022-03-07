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
        <h3>商品趋势</h3>
        <div style="display: flex;justify-content: space-between; padding: 0 20%; font-size: 16px;line-height: 28px;text-align: center;">
          <div>
            <div>销量</div>
            <div style="font-size: 24px;font-weight: bold;">{{ topData.addSales }}</div>
          </div>
          <div>
            <div>带货视频</div>
            <div style="font-size: 24px;font-weight: bold;">{{ topData.addVideoCount }}</div>
          </div>
          <div>
            <div>带货达人</div>
            <div style="font-size: 24px;font-weight: bold;">{{ topData.addUserCount }}</div>
          </div>
          <div>
            <div>带货直播</div>
            <div style="font-size: 24px;font-weight: bold;">{{ topData.addLiveCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;">
        <div class="charts">
          <div class="item">
            <h3>销售&销售额趋势</h3>
            <div class="item-chart" id="sellNum"></div>
          </div>
          <div class="item">
            <h3>商品趋势</h3>
            <div class="item-chart" id="goodsCount"></div>
          </div>
          <div class="item">
            <h3>视频趋势</h3>
            <div class="item-chart" id="videoCount"></div>
          </div>
          <div class="item">
            <h3>直播场次趋势</h3>
            <div class="item-chart" id="liveCount"></div>
          </div>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;">
        <div style="display: flex; justify-content: space-around;">
          <div>
            <h3>商品分类销量占比</h3>
            <div id="pieChart" style="height: 360px;width: 400px"></div>
          </div>
          <div>
            <h3>商品价格区间</h3>
            <div id="barChart" style="height: 360px;width: 500px"></div>
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
        leftData: {
          simpleDto: [{}]
        },
        flowChartData: {
          sellNum: [], // 销量
          sellPrice: [], // 销售额趋势
          goodsCount: [], // 商品趋势
          videoCount: [], // 	视频趋势
          liveCount: [] // 	直播场次趋势
        },
        topData: {}
      }
    },
    mounted() {
      this.getLiveBrandDetailLeftInfo();
    },
    methods: {
      getLiveBrandDetailLeftInfo() {
        LiveApi.getLiveBrandDetailLeftInfo({userId: this.$route.query.userId}).then(res => {
          this.leftData = res.data;
          this.getLiveSalesDetailTotalCount(res.data.shopId);
          LiveApi.getLiveBrandDetailNewData({shopId: res.data.shopId}).then(res => {
            this.topData = res.data;
          })
          this.pieChart(res.data.shopId)
        })
      },
      // 增量计算
      increaseNum(arr) {
        return arr.map((item, index) => {
          if(index === 0) return [item[0], 0];
          const yesterday = arr[index - 1]; // 昨日数据
          return [item[0], item[1] - yesterday[1]];
        })
      },
      // 计算数据最大值和最小值
      getMaxAndMin(arr) {
        const value = arr.map(item => item[1]);
        Array.prototype.max = function() {
          return Math.max.apply({}, this)
        }
        Array.prototype.min = function() {
          return Math.min.apply({}, this)
        }
        return {
          max: value.max(),
          min: value.min()
        }
      },

      getLiveSalesDetailTotalCount(shopId) {
        LiveApi.getLiveBrandDetailTotalCount({shopId}).then(res => {
          for (const key in res.data) {
            for (const item in this.flowChartData) {
              this.flowChartData[item].push([toDate(key, true), Number(res.data[key][item]) ]);
            }
          }
          this.allChart('sellNum', this.flowChartData.sellNum, this.flowChartData.sellPrice.map(item => [item[0], (item[1] / 100).toFixed(0)]));
          ['goodsCount', 'videoCount', 'liveCount'].forEach(item => {
            this.lineChart(item, this.flowChartData[item]);
          })
        })
      },

      // 批量处理
      allChart(id, data, data2) {
        var chartDom = document.getElementById(id);
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          legend: {
            data: ['销量', '销售额']
          },
          tooltip: {
            triggerOn: 'none',
            position: function (pt) {
              return [pt[0], 130];
            }
          },
          xAxis: {
            type: "category",
            axisTick: {
              alignWithLabel: true
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
            splitLine: {
              show: false
            }
          },
          yAxis: [
            {
              type: 'value',
              name: '销量',
              min: this.getMaxAndMin(data).min,
              max: this.getMaxAndMin(data).max,
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
              name: '销售额',
              min: this.getMaxAndMin(data2).min,
              max: this.getMaxAndMin(data2).max,
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
            left: 25,
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
              name: '销量',
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
              data: data
            },
            {
              name: '销售额',
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
              data: data2
            }
          ]
        };
        option && myChart.setOption(option);

      },

      lineChart(id, data) {
        var chartDom = document.getElementById(id);
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          tooltip: {},
          xAxis: {
            axisTick: {
              alignWithLabel: true
            },
            type: 'category',
            data: data.map(item => item[0])
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: data.map(item => item[1]),
              type: 'line',
              smooth: true
            }
          ]
        };

        option && myChart.setOption(option);
      },

      
      pieChart(shopId) {
        LiveApi.getLiveBrandDetailProductPercent({shopId}).then(res => {
          // 饼图
          const createPie = (data) => {
            var chartDom = document.getElementById("pieChart");
            var myChart = echarts.init(chartDom);
            var option;

            option = {
              tooltip: {
                trigger: "item",
                formatter: function (params) {
                  return `${params.name}:(${(params.value * 100).toFixed(1)})%`;
                },
              },
              series: [
                {
                  // name: "Access From",
                  type: "pie",
                  radius: ["40%", "70%"],
                  data: data.map(item => {
                    return {value: item.sellPre, name: item.firstCname}
                  }),
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                  },
                },
              ],
            };

            option && myChart.setOption(option);
          }

          const createBar = (data) => {
            var chartDom = document.getElementById('barChart');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
              xAxis: {
                type: 'category',
                data: data.map(item => item.priceStage)
              },
              yAxis: {
                type: 'value',
                axisLabel:{formatter:'{value} %'}
              },
              series: [
                {
                  data: data.map(item => (item.priceStageCountPre * 100).toFixed(1)),
                  type: 'bar',
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      formatter: function(value) {
                        return value.data + '%'
                      }
                    }
                  }
                }
              ],
              
            };

            option && myChart.setOption(option);
          }

          createPie(res.data.category);
          createBar(res.data.price);
          
        })
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
  }
</style>
