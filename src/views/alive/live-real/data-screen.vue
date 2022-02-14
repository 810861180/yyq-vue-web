<template>
    <div class="data-screen">
        <el-dialog
            title="数据大屏"
            top="7vh"
            :visible.sync="dialogVisible"
            width="70%"
            @open="handleOpen"
            >
            <div>
                <el-card class="box-card">
                    <div class="card-GMV">
                        <div>GMV</div>
                        <div class="card-num">{{ liveData.lastSalesPrice | toThousands}}</div>
                    </div>
                    <div class="info-card">
                        <div class="card-item">
                            <div class="card-title">当前在线人数</div>
                            <div class="card-num">{{ liveData.currentUserCount | toThousands}}</div>
                        </div>
                        <div class="card-item">
                            <div class="card-title">直播间点赞</div>
                            <div class="card-num">{{ liveData.likeCount | toThousands}}</div>
                        </div>
                        <div class="card-item">
                            <div class="card-title">平均观看时长</div>
                            <div class="card-num">{{ liveData.avgCurrentUserTime }}s</div>
                        </div>
                        <div class="card-item">
                            <div class="card-title">商品数</div>
                            <div class="card-num">{{ liveData.goodsCount | toThousands}}</div>
                        </div>
                        <div class="card-item">
                            <div class="card-title">商品销量</div>
                            <div class="card-num">{{ liveData.platformSalesCount | toThousands}}</div>
                        </div>
                        <div class="card-item">
                            <div class="card-title">累计观看人数</div>
                            <div class="card-num">{{ liveData.totalUser | toThousands}}</div>
                        </div>
                        <div class="card-item">
                            <div class="card-title">直播涨粉数</div>
                            <div class="card-num">{{ liveData.followerGrow | toThousands}}</div>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card" style="margin-top: 24px;">
                    <yyq-table 
                    :tableColumn="screenColumn" 
                    :tableData="screenTableData" 
                    @handleCurrentChange="handleCurrentChange"
                    :paginationConfig="{total, pageSize}">
                        <template #commodity="{row}">
                            <div class="commodity-slot">
                                <el-popover
                                    placement="top"
                                    width="240"
                                    trigger="hover"
                                >
                                    <template #reference>
                                        <img style="width: 40px; hegiht: 40px;" :src="row.image">
                                    </template>
                                    <template>
                                        <img style="width: 100%; hegiht: 100%;" :src="row.image">
                                    </template>
                                </el-popover>
                                <div class="commodity-title">
                                    {{ row.title }}
                                </div>
                            </div>
                        </template>
                        <template #time="{row}">
                            <div>
                                <div>{{ row.inserttime | toDate}}</div>
                                <div>{{ row.livefinishtime | toDate}}</div>
                            </div>
                        </template>
                    </yyq-table>
                </el-card>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import yyqTable from '../modules/yyq-table.vue';
import LiveApi from '../../../api/liveApi';
import { screenColumn } from './config';
export default {
    components: {
        yyqTable
    },
    props: {
        liveData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            dialogVisible: false,
            total: 0,
            pageSize: 4,
            screenColumn: screenColumn,
            screenTableData: []
        }
    },
    methods: {
        handleOpen() {
            this.getLiveRealBigScreen();
        },
        getLiveRealBigScreen(page) {
            const params = {
                liveId: this.liveData.liveId,
                page: page || 1,
                pageSize: this.pageSize
            }
            LiveApi.getLiveRealBigScreen(params).then(res => {
                this.total = res.size
                this.screenTableData = res.data;
            })
        },
        // 分页
        handleCurrentChange(val) {
            this.getLiveRealBigScreen(val);
        },
    }
}
</script>

<style lang="scss" scoped>
    .data-screen{
        /deep/ .el-dialog__header{
            border-bottom: 1px solid #DCDFE6;
        }
    }
    .info-card{
        width: 100%;
        display: flex;
        .card-item{
            flex: 1;
            border-right: none;
            box-sizing: border-box;
            padding-top: 24px;
        }
        .card-num{
            font-weight: bold;
            font-size: 28px;
            color: #0bbdbe;
        }
        .card-title{
            font-weight: bold;
        }
    }
    .card-GMV{
        font-size: 48px;
        color: #ffb22d;
    }
    .commodity-slot{
        display: flex;
        align-items: center;
        line-height: 18px;
        .commodity-title{
            margin-left: 8px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
    }
</style>