<template>
    <div class="room-card">
        <el-card class="box-card" style="height: 100%;">
            <div class="room-header">
                <img class="header-img50" :src="roomInfo.user.avatar_larger">
                <div>
                    <div class="vertical">
                        <span>{{ roomInfo.user.nickname }}</span>
                        <img src="" alt="">
                        <img src="" alt="">
                    </div>
                    <div style="font-size: 13px">
                        <span>带货口碑：</span>
                        <span style="font-weight: bold; color: red;">{{ roomInfo.user.score_now_months_ago }}</span>
                    </div>
                </div>
            </div>
            <div class="room-date">
                <img src="" alt="">
                <span>{{ roomInfo.planData.plan_live_time | toDate }}</span>
            </div>
            <div class="room-data">
                <div style="text-align: center;">
                    <div style="font-weight: bold;">{{ roomInfo.liveData.total_user | toWan}}</div>
                    <div>累计观看人次</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-weight: bold;">{{ roomInfo.liveData.last_sales_grow | toWan}}</div>
                    <div>
                        <span>销量</span>
                        <img src="">
                    </div>
                </div>
                <div style="text-align: center;">
                    <div style="font-weight: bold;">{{ roomInfo.liveData.last_sales_price | tablefilter('centToyuan') | toWan }}</div>
                    <div>销售额(预估)</div>
                </div>
            </div>
            <div class="room-record">
                <a style="color: #409EFF;" @click="handleRecord">直播记录 <span style="font-weight: bold;">{{ roomInfo.planData.tiktok_user_live_count }}</span>场>></a>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    props: {
        roomInfo: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        handleRecord() {
            this.$emit('handleRecord', this.roomInfo)
        }
    }
}
</script>

<style lang="scss" scoped>
    .room-card{
        width: 300px;
        // height: 290px;
        font-size: 14px;
        .room-header{
            display: flex;
            align-items: center;
            .header-img50{
                margin-right: 12px;
            }
            .vertical{
                margin-bottom: 3px;
                font-weight: bold;
            }
        }

        .room-date{
            height: 28px;
            width: 100%;
            border: 1px solid #DCDFE6;
            border-radius: 14px;
            margin: 16px auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .room-data{
            display: flex;
            justify-content: space-between;
        }

        .room-record{
            border-top: 1px solid #DCDFE6;
            margin-top: 4px;
            padding: 8px 0 0 0 ;
            text-align: center;
        }
    }
</style>
