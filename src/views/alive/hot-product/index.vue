<template class="base-main">
  <div>
    <yyq-table
      :tableColumn="rankColumn"
      :tableData="tableData"
      :paginationConfig="{ total, pageSize }"
      @handleCurrentChange="handleCurrentChange"
    >
      <template #rank="{ row }">
        <span>
          {{row.ranking}}
        </span>
        <span class="tag-group">
          <el-tag effect="plain">
            <span>{{ row.rankingIncrement | tablefilter('rankingIncrement') || '-'}}</span>
          </el-tag>
        </span>
      </template>
      <template #product="{row}">
        <div class="content-slot">
          <el-popover
            placement="top"
            width="240"
            trigger="hover"
          >
            <template #reference>
              <el-image class="live-cover" :src="row.image"></el-image>
            </template>
            <template>
              <el-image style="width: 100%; hegiht: 100%;" :src="row.image"></el-image>
            </template>
          </el-popover>
          <div style="margin-left: 8px; ">
            <div class="vertical_2" style="font-size: 14px;">{{row.title}}</div>
            <div style="margin-top: 4px;">
              <span>售价：</span>
              <span class="price-css">￥{{ row.price | tablefilter('centToyuan') }}</span>
              <span class="delete-line">{{ row.marketPrice |  tablefilter('centToyuan')  }}</span>
            </div>
          </div>
        </div>
      </template>
      <template #op="{ row }">
        <el-button size="mini" type="primary" @click="handleInfo(row)">
          商品详情
        </el-button>
      </template>
    </yyq-table>
  </div>
</template>

<script>
  import yyqTable from '../modules/yyq-table.vue';
  import {rankColumn} from "./config";
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
      this.getLiveProductSaleRank();
    },
    methods: {
      getLiveProductSaleRank() {
        const params = {
          page: this.page,
          pageSize: this.pageSize
        }
        LiveApi.getLiveProductSaleRank(params).then(res => {
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
        window.open(`${window.location.origin}#/productAttrList?goodsId=${row.goodsId}&orderCount=${row.totalProductOrderAccount}&conversionRate=${row.conversionRate}&promotionCount=${row.totalPromotionUserAccount}`);
      }
    },
  };
</script>

<style lang="scss" scoped>
  .live-cover {
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }

  .content-slot {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 16px;
  }

  .delete-line {
    text-decoration: line-through;
  }

  .price-css {
    font-weight: bold;
    color: orangered;
  }

  .tag-group {
    & /deep/ .el-tag {
      width: 50px;
      padding: 0px;
      margin-left: 10px;
      height: 20px;
      border-radius: 30px;
      font-weight: bold;
      line-height: 20px;
    }
  }
</style>
