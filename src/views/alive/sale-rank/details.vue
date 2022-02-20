<template>
    <div class="rank-details">
        <div class="left">
            <div class="time">
                <span>数据更新时间</span>
                <span>2023213123</span>
            </div>
            <div>
                <img src="" alt="">
                <div>
                    <div>很高兴认识你</div>
                    <div>开播时长：3饿请32132</div>
                    <div>开播时间：3饿请32132</div>
                    <div>下播时间：3饿请32132</div>
                    <div>
                        <span>带货口碑</span>
                        <span>3.55</span>
                    </div>
                </div>
            </div>
            <div class="divder"></div>
            <el-card class="box-card">

            </el-card>
        </div>
        <div class="right">

        </div>
    </div>
</template>

<script>
export default {
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
    .rank-details{
        padding: 20px;
        display: flex;
        font-size: 12px;
        .left{
            width: 30%;
            border: 1px solid #DCDFE6;
            border-radius: 10px;
            overflow: hidden;
            box-sizing: border-box;
            .time{
                background: #909399;
                text-align: center;
                height: 24px;
                line-height: 24px;
                width: 100%;
            }
        }
        .right{
            flex: 1;
        }
    }
</style>