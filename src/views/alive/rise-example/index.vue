<template>
    <div class="base-main rise-center">
        <video-card class="rise-item" v-for="(item, index) in videoList" :key="item.videoId" :item="item" :index="index"></video-card>
    </div>
</template>

<script>
import videoCard from './video-card.vue';
import LiveApi from "@/api/liveApi";
export default {
    components: {
        videoCard
    },
    data() {
        return {
            page: 1,
            pageSize: 20,
            videoList: []
        }
    },
    mounted() {
        this.getLiveVideoHot();
    },
    methods: {
        getLiveVideoHot() {
            LiveApi.getLiveVideoHot({page: this.page, pageSize: this.pageSize}).then(res => {
                this.videoList = res.data;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .rise-center{
        display: flex;
        flex-wrap: wrap;
    }
    .rise-item{
        margin-right: 40px;
        margin-bottom: 40px;
    }
</style>