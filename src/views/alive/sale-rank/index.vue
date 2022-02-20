<template class="base-main">
  <div>
      <yyq-table
        :tableColumn="rankColumn"
        :tableData="tableData"
        :paginationConfig="{ total, pageSize }"
        @handleCurrentChange="handleCurrentChange"
      >
        <template #live="{row}">
            <div class="content-slot">
                <el-popover
                    placement="top"
                    width="240"
                    trigger="hover"
                >
                    <template #reference>
                        <el-image class="live-cover" :src="row.cover"></el-image>
                    </template>
                    <template>
                        <el-image style="width: 100%; hegiht: 100%;" :src="row.cover"></el-image>
                    </template>
                </el-popover>
                <div style="margin-left: 8px; ">
                    <div class="vertical" style="font-weight: bold; font-size: 14px;">{{row.title}}</div>
                    <div style="margin-top: 4px;">
                        <span>直播时长：</span>
                        <span>{{row.duringTime | tablefilter('toTime')}}</span>
                    </div>
                </div>
            </div>
        </template>
        <template #user="{ row }">
            <div class="content-slot">
                <el-image class="header-img50" :src="row.userSimpleData.avatar_larger"></el-image>
                <div style="margin-left: 8px;">
                    <div class="user-title">
                        <span class="vertical" style="font-weight: bold; font-size: 14px; margin-right: 4px;">{{ row.userSimpleData.nickname }}</span>
                        <el-tag size="mini" v-if="row.userSimpleData.user_tag">{{ row.userSimpleData.user_tag }}</el-tag>
                    </div>
                    <div style="margin-top: 4px;">
                        <span>粉丝数：{{ row.userSimpleData.follower_count | toWan}}</span>
                        |
                        <span>
                            <span>带货口碑：</span>
                            <span style="font-weight: bold; font-size: 13px;color: red;">{{ row.userSimpleData.score_now_months_ago }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </template>
        <template #op="{ row }">
            <el-button size="mini" type="primary" @click="handleInfo(row)"
              >查看详情</el-button
            >
          </template>
      </yyq-table>
    </div>
</template>

<script>
import yyqTable from '../modules/yyq-table.vue';
import { rankColumn } from "./config";
import LiveApi from "@/api/liveApi";
export default {
  components: {
    yyqTable,
  },
  data() {
    return {
      dialogVisible: false,
      recordData: {
        user: {},
        planData: {},
      },
      rankColumn,
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
    };
  },
  mounted() {
      this.getLiveHotRoomHistory();
  },
  methods: {
      getLiveHotRoomHistory() {
          const params = {
              page: this.page,
              pageSize: this.pageSize
          }
          LiveApi.getLiveSalesRank(params).then(res => {
              this.total = res.size;
              res.data.forEach((item, index) => {
                  item.ranking = (index + 1) + ((this.page - 1) * 10);
              })
              this.tableData = res.data;
          })
      },
    handleCurrentChange(val) {
        this.page = val;
        this.getLiveHotRoomHistory();
    },
    handleInfo(row) {
        window.open(`${window.location.origin}#/addProductCate?liveId=${row.liveId}&img=${row.userSimpleData.avatar_larger}&nick=${row.userSimpleData.nickname}&like=${row.userSimpleData.follower_count}&account=${row.userSimpleData.unique_id}&tag=${row.userSimpleData.user_tag}`);
    }
  },
};
</script>

<style lang="scss" scoped>
    .live-cover{
        width: 50px;
        height: 50px;
        border-radius: 10px;
    }
    .content-slot{
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 16px;
    }
    .user-title{
        display: flex;
        align-items: center;
    }
</style>