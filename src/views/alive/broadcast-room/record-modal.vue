<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="50%"
    top="15vh"
    @open="handleOpen"
  >
    <div slot="title" class="dialog-header">
      <img class="header-img50" :src="recordData.user.avatar_larger" />
      <div class="header-info">
        <div style="font-weight: bold; margin-bottom: 3px">
          {{ recordData.user.nickname }}
        </div>
        <div class="vertical">{{ recordData.user.signature }}</div>
      </div>
      <div style="text-align: right; font-weight: bold; flex: 1">
        共{{ recordData.planData.tiktok_user_live_count }}场直播
      </div>
    </div>
    <div>
      <yyq-table
        :tableColumn="recordColumn"
        :tableData="tableData"
        :paginationConfig="{ total, pageSize }"
        @handleCurrentChange="handleCurrentChange"
      >
        <template #content="{row}">
            <div class="content-slot">
                <el-popover
                    placement="top"
                    width="240"
                    trigger="hover"
                >
                    <template #reference>
                        <el-image class="content-img" :src="row.cover"></el-image>
                    </template>
                    <template>
                        <el-image style="width: 100%; hegiht: 100%;" :src="row.cover"></el-image>
                    </template>
                </el-popover>
                <div class="content-title">
                    {{ row.title }}
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
  </el-dialog>
</template>

<script>
import yyqTable from "../modules/yyq-table.vue";
import { recordColumn } from "./config";
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
      recordColumn,
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 5,
    };
  },
  methods: {
      getLiveHotRoomHistory() {
          const params = {
              shortId: this.recordData.user.short_id,
              page: this.page,
              pageSize: this.pageSize
          }
          LiveApi.getLiveHotRoomHistory(params).then(res => {
              this.total = res.size;
              this.tableData = res.data;
          })
      },
    //   打开回调
      handleOpen() {
          this.getLiveHotRoomHistory();
      },
    handleCurrentChange(val) {
        this.page = val;
        this.getLiveHotRoomHistory();
    },
    handleInfo(row) {
        
    }
  },
};
</script>

<style lang="scss" scoped>
.dialog-header {
  font-size: 13px;
  display: flex;
  align-items: center;
  padding-right: 30px;
  .header-info {
    margin-left: 10px;
    width: 70%;
  }
}
.content-slot{
    display: flex;
    align-items: center;
    .content-img{
        width: 54px;
        height: 54px;
        border-radius: 10px;
    }
    .content-title{
        font-size: 14px;
        font-weight: 500;
        margin-left: 6px;
    }
}
</style>