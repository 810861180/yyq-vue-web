<template>
    <div class="rank-details">
        <div class="left">
            <!-- <div class="time">
                <span>数据更新时间</span>
                <span>2023213123</span>
            </div> -->
            <div class="left-header">
                <el-image style="width: 100px; hegiht: 100px;" :src="leftData.cover"></el-image>
                <div style="margin-left: 12px;">
                    <div class="vertical" style="font-weight: bold; font-size: 14px;">{{ leftData.title }}</div>
                    <div style="color: #606266">开播时长：{{ leftData.duringTime }}</div>
                    <div style="color: #606266">开播时间：{{ leftData.createTime }}</div>
                    <div style="color: #606266">下播时间：{{ leftData.finishTime }}</div>
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
            <el-card class="box-card">
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
                <div class="divder" style="margin: 0;"></div>
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
                <div class="divder" style="margin: 0;"></div>
                <div class="left-data">
                    <div class="item">
                        <div>坑位效益</div>
                        <div class="value">￥{{ leftData.pitEarnings | tablefilter('centToyuan') | toWan }}</div>
                    </div>
                    <div class="item">
                        <div>购买转化</div>
                        <div class="value">{{ leftData.buyConversion }}</div>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="right">

        </div>
    </div>
</template>

<script>
import LiveApi from "@/api/liveApi";
export default {
    data() {
        return {
            leftData: {}
        }
    },
    mounted() {
        this.getLiveSalesDetailLeftInfo();
    },
    methods: {
        getLiveSalesDetailLeftInfo() {
            LiveApi.getLiveSalesDetailLeftInfo({liveId: this.$route.query.liveId}).then(res => {
                this.leftData = res.data;
            })
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
            
        }
    }
</style>