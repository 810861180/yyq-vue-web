<template>
    <div class="rank-details">
        <div class="left">
            <!-- <div class="time">
                <span>数据更新时间</span>
                <span>2023213123</span>
            </div> -->
            <div class="left-header">
                <el-image style="width: 80px; height: 80px;" :src="leftData.cover"></el-image>
                <div style="margin-left: 12px;">
                    <div class="vertical" style="font-weight: bold; font-size: 14px;">{{ leftData.title }}</div>
                    <div style="color: #606266">开播时长：{{ leftData.duringTime | tablefilter('toTime')}}</div>
                    <div style="color: #606266">开播时间：{{ leftData.createTime | toDate }}</div>
                    <div style="color: #606266">下播时间：{{ leftData.finishTime | toDate }}</div>
                    <!-- <div>
                        <span style="color: #606266">带货口碑：</span><span style="color: red; font-weight: bold;">3.55</span>
                    </div> -->
                </div>
            </div>
            <div class="divder"></div>
            <el-card class="box-card">
                <h3>进场流量</h3>
                <div class="left-data">
                    <div class="item">
                        <div>观看人次</div>
                        <div class="value">{{ leftData.totalUser | toWan }}</div>
                    </div>
                    <div class="item">
                        <div>平均在线</div>
                        <div class="value">{{ leftData.avgCurrentUser }}</div>
                    </div>
                    <div class="item">
                        <div>在线峰值</div>
                        <div class="value">{{ leftData.maxUserCount }}</div>
                    </div>
                    <div class="item">
                        <div>平均观看时长</div>
                        <div class="value">{{ (Number(leftData.avgCurrentUserTime) * 1000) | tablefilter('toTime') }}</div>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px;">
                <h3>带货转化</h3>
                <div class="left-data">
                    <div class="item">
                        <div>销售额</div>
                        <div class="value">￥{{ leftData.lastSalesPrice | tablefilter('yuanAndWan') }}</div>
                    </div>
                    <div class="item">
                        <div>销量</div>
                        <div class="value">{{ leftData.lastSalesGrow | toWan }}</div>
                    </div>
                    <div class="item">
                        <div>商品数</div>
                        <div class="value">{{ leftData.goodsCount }}</div>
                    </div>
                </div>
                <div class="divder" style="margin: -12px 0 12px 0;"></div>
                <div class="left-data">
                    <div class="item">
                        <div>GPM</div>
                        <div class="value">￥{{ leftData.gmp | tablefilter('centToyuan') }}</div>
                    </div>
                    <div class="item">
                        <div>UV价值</div>
                        <div class="value">{{ leftData.gmp | tablefilter('centToyuan') | uv}}</div>
                    </div>
                    <div class="item">
                        <div>客单价</div>
                        <div class="value">{{ leftData.perPeoplePrice | tablefilter('centToyuan')}}</div>
                    </div>
                </div>
                <div class="divder" style="margin: -12px 0 12px 0;"></div>
                <div class="left-data">
                    <div class="item">
                        <div>坑位效益</div>
                        <div class="value">￥{{ leftData.pitEarnings | tablefilter('centToyuan') | toWan }}</div>
                    </div>
                    <div class="item">
                        <div>购买转化</div>
                        <div class="value">{{ leftData.buyConversion | tablefilter('percent')}}</div>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px;">
                <h3>流量转化</h3>
                <div class="left-data">
                    <div class="item">
                        <div>单场涨粉</div>
                        <div class="value">{{ leftData.followerGrow }}</div>
                    </div>
                    <!-- <div class="item">
                        <div>转粉率</div>
                        <div class="value">{{ leftData.avgCurrentUser }}</div>
                    </div> -->
                    <div class="item">
                        <div>点赞数</div>
                        <div class="value">{{ leftData.likeCount }}</div>
                    </div>
                </div>
            </el-card>
            <div class="box-card">
                <h3>作者信息</h3>
                <div style="display: flex;">
                    <img :src="$route.query.img" class="header-img50" style="margin-right: 12px;">
                    <div>
                        <div>
                            <span style="font-weight: bold;">{{ $route.query.nick }}</span>
                            <el-tag size="mini">{{ $route.query.tag }}</el-tag>
                        </div>
                        <div style="margin-top: 4px;">账号：{{ $route.query.account }}</div>
                        <div style="margin-top: 4px;">粉丝数：{{ $route.query.like | toWan }}</div>
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
import { toDate } from './config';
export default {
    data() {
        return {
            leftData: {},
            flowChartData: {data: [], data2: []},
        }
    },
    mounted() {
        this.getLiveHotRoomDetailLeftInfo();
        this.getLiveHotRoomDetailTotalCount();
        this.flowChart();
    },
    methods: {
      getLiveHotRoomDetailLeftInfo() {
            LiveApi.getLiveHotRoomDetailLeftInfo({liveId: this.$route.query.liveId}).then(res => {
                this.leftData = res.data;
            })
        },
      getLiveHotRoomDetailTotalCount() {
            LiveApi.getLiveHotRoomDetailTotalCount({liveId: this.$route.query.liveId}).then(res => {
                const arrs = {
                    data: [],
                    data2: []
                }
                console.log(res.data)
                for (const key in res.data) {
                    arrs.data.push([toDate(key), Number(res.data[key].enterCount) ]);
                    arrs.data2.push([toDate(key), Number(res.data[key].currentUserCount) ]);
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
    .rank-details{
        padding: 20px;
        display: flex;
        font-size: 12px;
        .left{
            width: 370px;
            border: 1px solid #DCDFE6;
            border-radius: 10px;
            overflow: hidden;
            box-sizing: border-box;
            padding: 20px 0;
            .time{
                background: #909399;
                text-align: center;
                height: 24px;
                line-height: 24px;
                width: 100%;
            }
            .left-header{
                display: flex;
                align-items: center;
                width: 90%;
                margin: 0 auto;
            }
            .divder{
                width: 100%;
                height: 1px;
                box-sizing: border-box;
                border-top: 1px dashed #DCDFE6;
                margin: 20px 0;
            }
            .box-card{
                width: 90%;
                margin: 0 auto;
            }
            .left-data{
                display: flex;
                flex-wrap: wrap;
                .item{
                    width: 33%;
                    margin-bottom: 20px;
                }
                .value{
                    margin-top: 8px;
                    font-weight: bold;
                    font-size: 17px;
                }
            }
        }
        .right{
            flex: 1;
            margin-left: 20px;
        }
    }
</style>
