<template>
  <div class="rank-details">
    <div class="left">
      <div class="head-name">视频信息</div>
      <div class="left-header">
<!--        <el-image style="width: 80px; height: 80px;" :src="leftData.originCover"></el-image>-->
        <el-image style="width: 240px; height: 80px;" src="http://www.567zx.cn:81/static/images/IMG1645542129508.jpg"></el-image>
        <div style="margin-left: 12px;">
          <div class="vertical" style="font-weight: bold; font-size: 14px;">{{ leftData.videoDesc }}</div>
          <div style="color: #606266">视频时长：{{ (leftData.duration/1000).toFixed(0) }}s</div>
          <div style="color: #606266">{{ leftData.createTime | tablefilter('toDate') }}</div>

        </div>
      </div>
      <el-card class="box-card">
        <div class="left-data left-data2">
          <div class="item2">
            <svg-icon iconClass="aixin" className="icon"></svg-icon>
            <div class="value value-orange">￥{{ leftData.goodCount | tablefilter('toWan')}} </div>

          </div>
          <div class="item2">
            <svg-icon iconClass="pinglun" className="icon"></svg-icon>
            <div class="value value-orange">￥{{ leftData.commentCount | tablefilter('toWan')}} </div>

          </div>
          <div class="item2">
            <svg-icon iconClass="fenxiang" className="icon"></svg-icon>
            <div class="value value-pink" style="padding-left: 5px;">{{ leftData.shareCount | tablefilter('toWan') }}</div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="right">
      <el-card>
        <div class="charts">
          <div class="item">
            <h2>点赞数趋势</h2>
            <div class="item-chart" id="goodValue"></div>
          </div>
          <div class="item">
            <h2>评论数趋势</h2>
            <div class="item-chart" id="commentValue"></div>
          </div>
          <div class="item" style="width: 100%;">
            <h2>分享数趋势</h2>
            <div class="item-chart" id="shareValue"></div>
          </div>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;">
        <h2>数据详情</h2>
        <yyq-table 
          :tableColumn="rankColumn" 
          :tableData="screenTableData">
        </yyq-table>
      </el-card>
    </div>
  </div>
</template>

<script>
  import LiveApi from "@/api/liveApi";
  import * as echarts from 'echarts';
  import { toDate, rankColumn } from './config';
  import yyqTable from "../modules/yyq-table.vue";
  export default {
    components: {
      yyqTable
    },
    data() {
      return {
        leftData: {storeGoodsData: {}},
        flowChartData: {
          commentValue: [],
          increase_commentValue: [], 
          goodValue: [], 
          increase_goodValue: [], 
          shareValue: [], 
          increase_shareValue: []
        },
        rankColumn: rankColumn,
        screenTableData: []
      }
    },
    filters: {
      filters1(val) {
        if(!val) return ''
        return `${(Number(val) * 100).toFixed(1)}%`;
      }
    },
    mounted() {
      this.getLiveVideoDetailLeftInfo();
      this.getLiveSalesDetailTotalCount();
    },
    methods: {
      // 分页
      handleCurrentChange(val) {
          this.getLiveRealBigScreen(val);
      },
      getLiveVideoDetailLeftInfo() {
        LiveApi.getLiveVideoDetailLeftInfo({videoId: this.$route.query.videoId}).then(res => {
          this.leftData = res.data;
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
      getLiveSalesDetailTotalCount() {
        LiveApi.getLiveVideoDetailTotalCount({videoId: this.$route.query.videoId}).then(res => {
          // 四个小图表的key
          const keys = ['commentValue', 'goodValue', 'shareValue']
          for (const key in res.data) {
            keys.forEach(item => {
              this.flowChartData[item].push([ toDate(key), Number(res.data[key][item]) ]);
            })
          }
          keys.forEach(item => {
            this.flowChartData[`increase_${item}`] = this.increaseNum(this.flowChartData[item]);
          })
          // 小图表
          keys.forEach(item => {
            this.allChart(item, this.flowChartData[item], this.flowChartData[`increase_${item}`])
          })

          for (const key in res.data) {
            this.screenTableData.push({
              time: toDate(res.data[key].createTime),
              commentValue: this.flowChartData.commentValue.find(item => item[0] === toDate(res.data[key].createTime))[1],
              increase_commentValue: this.flowChartData.increase_commentValue.find(item => item[0] === toDate(res.data[key].createTime))[1], 
              goodValue: this.flowChartData.goodValue.find(item => item[0] === toDate(res.data[key].createTime))[1], 
              increase_goodValue:this.flowChartData.increase_goodValue.find(item => item[0] === toDate(res.data[key].createTime))[1], 
              shareValue: this.flowChartData.shareValue.find(item => item[0] === toDate(res.data[key].createTime))[1], 
              increase_shareValue: this.flowChartData.increase_shareValue.find(item => item[0] === toDate(res.data[key].createTime))[1]
            })
          }
        })
      },

      // 批量处理
      allChart(id, data, data2) {
        var chartDom = document.getElementById(id);
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          legend: {
            data: ['增量', '总量']
          },
          tooltip: {
            triggerOn: 'none',
            position: function (pt) {
              return [pt[0], 130];
            }
          },
          xAxis: {
            type: 'time',
            axisTick: {
              length: 10
            },
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
                  console.log(params)
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
          yAxis: [
            {
              type: 'value',
              name: '增量',
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
            },
            {
              type: 'value',
              name: '总量',
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
              name: '总量',
              type: 'line',
              yAxisIndex: 1,
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
              name: '增量',
              type: 'line',
              yAxisIndex: 0,
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
