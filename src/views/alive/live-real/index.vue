<template>
  <div class="base-main">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :label="item.label"
        :name="item.name"
        v-for="item in tableList"
        :key="item.name"
      >
        <yyq-table
          :tableColumn="item.tableColumn"
          :tableData="item.tableData"
          :paginationConfig="{ total: item.total, pageSize: item.pageSize }"
          @handleCurrentChange="handleCurrentChange"
        >
          <template #live="{ row }">
            <div class="live-content">
              <a :href="row.shareUrl" target="_blank">
                <img class="live-corve" :src="row.cover" />
              </a>
              <div>
                <div class="live-title vertical">{{ row.title }}</div>
                <div>开播时间：{{ row.createTime | toDate }}</div>
              </div>
            </div>
          </template>
          <template #intelligent="{ row }">
            <div class="live-content" v-if="row.userData">
              <img class="user-img" :src="row.userData.avatar_larger" />
              <div>
                <div class="live-title vertical">
                  {{ row.userData.nickname }}
                </div>
                <div>
                  <span>粉丝：{{ row.followerCount | toWan }}</span>
                  <span>|</span>
                  <span
                    >带货口碑：<span style="font-weight: bold; color: red">{{
                      row.userData.score_four_months_ago || 0
                    }}</span></span
                  >
                </div>
              </div>
            </div>
          </template>
          <template #op="{ row }">
            <el-button size="mini" type="primary" @click="toDataScreen(row)"
              >数据大屏</el-button
            >
          </template>
        </yyq-table>
      </el-tab-pane>
    </el-tabs>
    <data-screen ref="dataScreen" :liveData="liveData"></data-screen>
  </div>
</template>
<script>
import yyqTable from "../modules/yyq-table.vue";
import dataScreen from "./data-screen.vue";
import { salesColumn, realColumn } from "./config";
import LiveApi from "../../../api/liveApi";
export default {
  components: {
    yyqTable,
    dataScreen,
  },
  data() {
    return {
      activeName: "1",
      tableList: [
        {
          label: "实时销售额榜",
          name: "1",
          tableColumn: salesColumn,
          tableData: [],
          total: 0,
          page: 1,
          pageSize: 10,
          apiName: "getLiveRealMoneys",
        },
        {
          label: "实时销量榜",
          name: "2",
          tableColumn: salesColumn,
          tableData: [],
          total: 0,
          page: 1,
          pageSize: 10,
          apiName: "getLiveRealSaves",
        },
        {
          label: "实时观看榜",
          name: "3",
          tableColumn: realColumn,
          tableData: [],
          total: 0,
          page: 1,
          pageSize: 10,
          apiName: "getLiveRealView",
        },
        {
          label: "实时点赞榜",
          name: "4",
          tableColumn: realColumn,
          tableData: [],
          total: 0,
          page: 1,
          pageSize: 10,
          apiName: "getLiveRealPraise",
        },
        {
          label: "主播粉丝榜",
          name: "5",
          tableColumn: realColumn,
          tableData: [],
          total: 0,
          page: 1,
          pageSize: 10,
          apiName: "getLiveRealFans",
        },
      ],
      liveData: {}, // 数据大屏data
    };
  },
  computed: {
    getCurrentData() {
      return this.tableList.filter((item) => item.name === this.activeName)[0];
    },
  },
  mounted() {
    // 查询实时销售额榜
    this.getLiveRealMoneys();
  },
  methods: {
    // 获取当前tab下的对象
    handleClick(tab, event) {
      this.getLiveRealMoneys();
    },
    // 分页
    handleCurrentChange(val) {
      this.getCurrentData.page = val;
      this.getLiveRealMoneys();
    },
    // 查询榜单
    getLiveRealMoneys() {
      LiveApi[this.getCurrentData.apiName]({
        page: this.getCurrentData.page,
        pageSize: this.getCurrentData.pageSize,
      }).then((res) => {
        this.getCurrentData.total = res.size;
        res.data.forEach((item, index) => {
          item.ranking = (index + 1) + ((this.getCurrentData.page - 1) * 10);
        });
        this.getCurrentData.tableData = res.data;
      });
    },
    // 前往数据大屏
    toDataScreen(row) {
      if (
        this.$store.state.permission.addRouters.some(
          (item) => item.name === "dataScreen"
        )
      ) {
        this.liveData = row;
        this.$refs.dataScreen.dialogVisible = true;
      } else {
        this.$message.error("数据大屏无权限！");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.live-content {
  display: flex;
  align-items: center;
  line-height: 18px;
  .live-corve {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    cursor: pointer;
  }
  .live-title {
    font-size: 13px;
    font-weight: bold;
  }
  .user-img {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    border-radius: 100px;
  }
}
</style>