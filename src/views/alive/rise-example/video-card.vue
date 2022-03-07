<template>
    <div>
        <div class="card">
            <!-- <div class="main" :style="{background: `url(${item.originCover}) 0% 0% / 100% 100%`}"> -->
            <div class="main" @click="handleLink" :style="{background: `url(http://www.567zx.cn:81/static/images/IMG1645542129508.jpg) 0% 0% / 100% 100%`}">
                <div class="header">
                    <span class="index">{{ index + 1 }}</span>
                    <span class="index"><i class="el-icon-timer"></i>{{ item.duration | getTime }}</span>
                </div>
                <div class="likes">
                    <svg-icon iconClass="aixin" className="icon"></svg-icon>
                    <div>{{ item.goodCount | toWan}}</div>
                    <svg-icon iconClass="pinglun" className="icon"></svg-icon>
                    <div>{{ item.commentCount | toWan }}</div>
                    <svg-icon iconClass="fenxiang" className="icon"></svg-icon>
                    <div>{{ item.shareCount | toWan }}</div>
                </div>
            </div>
            <div class="footer">
                <img class="header-img50" :src="item.avatarLarger">
                <div class="info">
                    <div style="font-weight: bold;">{{ item.userNickName }}</div>
                    <div>
                        <span style="margin-right: 8px;">{{ item.createTime | getDate}}</span>
                        <span style="color: red;">
                            <i class="el-icon-caret-top"></i>
                            <span>{{ item.goodCount | toWan}}</span>
                        </span>
                    </div>
                </div>
                <span @click="getDetail(item)">
                    <svg-icon iconClass="shangshen" className="icon"></svg-icon>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            typeof: Object,
            default: () => {}
        },
        index: {
            type: Number,
            default: 0
        }
    },
    filters: {
        getTime(val) {
            if(!val) return val;
            return (val / 1000).toFixed(0) + 's';
        }
    },
    methods: {
        handleLink() {
            window.open(this.item.shareUrl);
        },
        getDetail(row) {
          window.open(`${window.location.origin}#/addProductAttr?videoId=${row.videoId}`);
        }
    }
}
</script>

<style lang="scss" scoped>
    .card{
        height: 400px;
        width: 300px;
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
        border-radius: 10px;
        overflow: hidden;
        .main{
            flex: 8;
            display: flex;
            flex-direction: column;
            .header{
                padding: 20px 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .index{
                background: rgba($color: #000000, $alpha: 0.2);
                padding: 2px 6px;
                font-weight: bold;
                border-radius: 4px;
                color: white;
            }
            .likes{
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: flex-end;
                padding: 20px 15px;
                .icon, div{
                    font-weight: bold;
                    color: white;
                    margin-top: 8px;
                }
                .icon{
                    font-size: 22px;

                }
            }
        }
        .footer{
            flex: 2;
            padding: 0 12px;
            display: flex;
            align-items: center;
            .header-img50{
                margin-right: 8px;
            }
            .info{
                flex: 1;
                line-height: 22px;
            }
            .icon{
                color: rgb(145, 144, 141);
                cursor: pointer;
                font-size: 24px;
            }
        }
    }
</style>
