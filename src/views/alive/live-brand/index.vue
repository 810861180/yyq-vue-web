<template class="base-main">
  <div>
      <yyq-table
        :tableColumn="rankColumn"
        :tableData="tableData"
        :paginationConfig="{ total, pageSize }"
        @handleCurrentChange="handleCurrentChange"
      >
        <template #user="{ row }">
            <div class="content-slot">
                <img :src="row.simpleDto.avatar_larger" class="live-cover">
                <div>
                    {{row.simpleDto.nickname}}
                </div>
                <div>
                    {{row.duringTime}}
                </div>
                <div>
                    粉丝数：{{row.simpleDto.follower_count}}
                </div>
                <div>
                    带货口碑{{row.simpleDto.score_now_months_ago}}
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
      this.getLiveBrandRank();
  },
  methods: {
      getLiveBrandRank() {
          const params = {
              page: this.page,
              pageSize: this.pageSize
          }
          LiveApi.getLiveBrandRank(params).then(res => {
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
</style>