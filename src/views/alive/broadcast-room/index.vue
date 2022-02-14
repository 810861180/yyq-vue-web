<template>
    <div class="base-main">
        <div class="room-content">
            <el-timeline>
                <el-timeline-item
                v-for="(item, index) in roomList" 
                :key="index"
                placement="top"
                :timestamp="item[0].date">
                <div class="room-content">
                    <roomCard 
                        :roomInfo="room.data" 
                        v-for="room in item"  
                        :key="room.data.liveId">
                    </roomCard>
                </div>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
import roomCard from './room-card.vue';
import LiveApi from "../../../api/liveApi";
export default {
    components: {
        roomCard
    },
    data() {
        return {
            roomList: [],
            page: 1,
            pageSize: 999,
            total: 0
        }
    },
    mounted() {
        LiveApi.getLiveHotRoom({page: this.page, pageSize: this.pageSize}).then(res => {
            const data = []
            const listData = res.data.map(item => {
                return {
                    date: item.planData.created_at.split(" ")[0],
                    data: item
                }
            });
            listData.forEach((item, index) => {
                if(!data[listData[index].date]) {
                    let arr = [];
                    arr.push(listData[index]);
                    data[listData[index].date] = arr;
                } else {
                    data[listData[index].date].push(listData[index]);
                }
            });
            Object.keys(data).forEach(key => {
                this.roomList.push(data[key]);
            })
            console.log(this.roomList);
        })
    }
}
</script>

<style lang="scss" scoped>
    .room-content{
        display: flex;
        flex-wrap: wrap;
        & /deep/ .room-card{
            margin-right: 20px;
            margin-bottom: 20px;
        }
    }
</style>