<template>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          v-for="item in tableColumn"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
          <template v-if="item.slotName || item.NumConfig" #default="{ row, column, $index }">
            <div v-if="item.slotName">
              <slot :name="item.slotName" :row="row" :column="column" :tableIndex="$index"></slot>
            </div>
            <div v-if="item.NumConfig" style="font-weight: bold;" :style="item.NumConfig.style">
              <span v-if="item.NumConfig.unit">{{ item.NumConfig.unit }}</span>
              <span v-if="item.NumConfig.filterName">{{ row[item.prop] | tablefilter(item.NumConfig.filterName, item.NumConfig.replace) }}</span>
              <span v-else>{{ row[item.prop] }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding: 20px 20px 0 0; text-align: right;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="paginationConfig.pageSize"
          layout="total, prev, pager, next"
          :total="paginationConfig.total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
      props: {
        tableData: {
          type: Array,
          default: () => []
        },
        tableColumn: {
          type: Array,
          default: () => []
        },
        paginationConfig: {
          type: Object,
          default: () => {}
        }
      },
      data() {
        return {
          
        }
      },
      methods: {
        handleCurrentChange(val) {
          this.$emit('handleCurrentChange', val);
        }
      }
    }
</script>